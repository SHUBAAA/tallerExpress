import usuarioModel from "./models/usuario.model.js";
import { verifyToken } from "./services/jwt.js";

export function authRequired(req, res, next) {
    const authorizationHeader =
        req.headers.authorization || req.headers.Authorization;

    try {
        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            throw new Error("sin token");
        }

        const { id } = verifyToken(token);

        req.id = id;

        return next();
    } catch (error) {
        return res
            .status(403)
            .send({ error: "no tienes los permisos (falta token o esta expirado)" });
    }
}

export async function hasRole(req, res, next) {
    const { rol } = await usuarioModel.findById(req.id).exec();
    const validRoles = ["CAJERO", "BODEGUERO", "ADMIN"];

    if (validRoles.includes(rol.toUpperCase())) {
        return next();
    }

    return res.status(401).send({ error: `El usuario no tiene el rol requerido` });
}


export async function hasAdmin(req, res, next) {


    const { rol } = await usuarioModel.findById(req.id).exec();
    const validRoles = ["ADMIN"];


    if (validRoles.includes(rol.toUpperCase())) {
        return next();
    }

    return res.status(401).send({ error: `El usuario no es Administrador` });
}
