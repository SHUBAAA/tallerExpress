import { Router } from 'express';
import {
    createProduct,
    getProduct,
    deleteProductById,
    updateProductById,
} from '../controllers/producto.controller.js';

import {
    authRequired,
    hasAdmin,
    hasRole
} from "../middleware.js";

const router = Router();
router.get('/bodega', authRequired, getProduct);
router.post('/crearproducto', createProduct);
router.delete('/bodega/:productId', deleteProductById);
router.put('/modprod/:productId', updateProductById);
export default router;
