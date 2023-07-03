import { Router } from 'express';

import {
    createUser,
    listUsers,
    deleteUser,
    updateUser,
    changePass
} from '../controllers/usuario.controller.js';

const router = Router();

router.post("/registrar", createUser);
router.get("/usuarios", listUsers);


export default router;