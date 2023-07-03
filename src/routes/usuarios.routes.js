import { Router } from 'express';

import {
    createUser,
    listUsers,
    login,
    deleteUser,
    updateUser,
    changePass
} from '../controllers/usuario.controller.js';

import { authRequired } from "../middleware.js";

const router = Router();

router.post("/registrar", createUser);
router.post("/login", login)
router.get("/usuarios", authRequired, listUsers);



export default router;