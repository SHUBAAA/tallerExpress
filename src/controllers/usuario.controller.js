import usuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import validarRut from "../services/validadorRut.js"
import { generateToken } from "../services/jwt.js";



async function createUser(req, res) {
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasena = req.body.contrasena;
        const rut = req.body.rut;
        const rol = req.body.rol;

        if (!contrasena) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Contraseña" })
        }

        const encryptedPassword = bcrypt.hashSync(contrasena, 10);

        if (!nombre) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Nombre" })
        }
        if (!email) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Email" })
        }
        if (!rut) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Rut" })
        }
        if (!validarRut(rut)) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Rut Invalido" });
        }

        if (!rol) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Rol" })
        }
        if (!["TRABAJADOR", "ADMIN"].includes(rol.toUpperCase())) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Rol Invalido" });
        }

        const usuarioCreated = await usuarioModel.create({ nombre: nombre, email: email, rut: rut, rol: rol.toUpperCase(), contrasena: encryptedPassword });
        res.send({ success: true });
    } catch (err) {
        res.status(500).send(err);

    }
}


async function listUsers(req, res) {
    try {
        const users = await usuarioModel.find({});
        res.send(users)
    } catch (err) {
        res.status(500).send(err);
    }

}

async function deleteUser(req, res) {
    try {
        const userId = req.params.userId;

        if (userId === "64a634bef6928f6274d30499") {
            return res.status(400).send({ message: "ERROR NO PUEDES BORRAR A MANOLO" })
        }

        if (userId === req.id) {
            return res.status(400).send({ message: "ERROR TE PUEDES ELIMINAR A TI MISMO" })
        }
        const user = await usuarioModel.deleteOne({ _id: userId });
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId;
        const nombre = req.body.nombre;
        const email = req.body.email;
        const rol = req.body.rol;

        if (!nombre) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Nombre" })
        }
        if (!email) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Email" })
        }
        if (!rol) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Rol" })
        }
        if (!["TRABAJADOR", "ADMIN"].includes(rol.toUpperCase())) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Rol Invalido" });
        }
        const user = await usuarioModel.updateOne({ _id: userId }, { nombre: nombre, email: email, rol: rol.toUpperCase() });
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function changePass(req, res) {

    try {
        const userId = req.params.userId;
        const contrasena = req.body.contrasena;
        if (!contrasena) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Contraseña" })
        }
        const encryptedPassword = bcrypt.hashSync(contrasena, 10);
        const user = await usuarioModel.updateOne({ _id: userId }, { contrasena: encryptedPassword });
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function login(req, res) {

    const contrasena = req.body.contrasena;
    const user = await usuarioModel.findOne({ email: req.body.email })
        .select("+contrasena")
        .exec();


    if (!user) {
        return res.status(404).json({ error: "usuario no encontrado" });
    }

    if (!contrasena) {
        return res.status(500).send({ error: "falta contraseña" });
    }


    const passwordIsCorrect = await bcrypt.compare(
        contrasena,
        user.contrasena
    );



    if (!passwordIsCorrect) {
        return res.status(400).json({ error: "contrasena invalida" });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
}

async function sesionActual(req, res) {
    try {
        const user = await usuarioModel.findById(req.id).exec();

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(403).json(err);
    }
}

async function getUser(req, res) {
    try {
        const userId = req.params.userId;
        const user = await usuarioModel.findOne({ _id: userId })
        res.send(user)
    } catch (err) {
        res.status(500).send(err);
    }

}

export { createUser, listUsers, updateUser, deleteUser, changePass, login, sesionActual, getUser }