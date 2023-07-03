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