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

router.post("/registrar", authRequired, hasAdmin, createUser);
router.post("/login", login);
router.get("/usuarios", authRequired, listUsers);
router.delete("/admin/:userId", authRequired, hasAdmin, deleteUser);
router.put("/modusr/:userId", authRequired, hasAdmin, updateUser);
router.put("/modpass/:userId", authRequired, hasAdmin, changePass);
router.get("/me", authRequired, sesionActual);



export default router;