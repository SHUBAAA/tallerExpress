import { Router } from 'express';

import {
    createUser,
    listUsers,
    login,
    deleteUser,
    updateUser,
    changePass,
    sesionActual
} from '../controllers/usuario.controller.js';

import {
    authRequired,
    hasAdmin,
    hasRole
} from "../middleware.js";

const router = Router();

router.post("/registrar", createUser);
router.post("/login", login);
router.get("/usuarios", authRequired, hasAdmin, listUsers);
router.delete("/admin/:userId", deleteUser);
router.put("/modusr/:userId", updateUser);
router.put("/modpass/:userId", changePass);
router.get("/me", authRequired, sesionActual);



export default router;