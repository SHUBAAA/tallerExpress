import usuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import validarRut from "../services/validadorRut.js"


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
        if (!["CAJERO", "BODEGUERO", "ADMIN"].includes(rol.toUpperCase())) {
            return res.status(400).send({ success: false, message: "ERROR⚠️ Rol Invalido" });
        }

        const usuarioCreated = await usuarioModel.create({ nombre: nombre, email: email, rut: rut, rol: rol, contrasena: encryptedPassword });
        res.send({ success: true });
    } catch (err) {
        res.status(500).send(err);

    }
}

export { createUser }