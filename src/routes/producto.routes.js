import { Router } from 'express';
import {
    createProduct,
    getProduct,
    deleteProductById,
    updateProductById,
    getProductById
} from '../controllers/producto.controller.js';

import {
    authRequired,
    hasAdmin,
    hasRole
} from "../middleware.js";

const router = Router();
router.get('/bodega', authRequired, getProduct);
router.get("/bodega/:prodId", authRequired, hasAdmin, getProductById);
router.post('/crearproducto', authRequired, hasRole, createProduct);
router.delete('/bodega/:productId', authRequired, hasRole, deleteProductById);
router.put('/modprod/:productId', authRequired, hasRole, updateProductById);
export default router;
