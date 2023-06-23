import usuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt";


async function createUser(req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const contrasena = req.body.contrasena;
        const rut = req.body.rut;
        const rol = req.body.rol;
        const encryptedPassword = bcrypt.hashSync(contrasena, 10);

        if (!name) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Nombre" })
        }
        if (!email) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Email" })
        }
        if (!rut) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Rut" })
        }
        if (!contrasena) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Contraseña" })
        }
        if (!rol) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Falta Rol" })
        }

        const usuarioCreated = await usuarioModel.create({ name: name, email: email, rut: rut, rol: rol, contrasena: encryptedPassword });
        res.send({ success: true });
    } catch (err) {
        res.status(500).send(err);

    }
}

export { createUser }