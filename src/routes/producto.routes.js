import { Router } from 'express';
import {
    createProduct,
    getProduct,
    deleteProductById,
    updateProductById,
    getProductById,
    venderProducto,
    getCarrito,
    guardarCarritoEnBoleta
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
router.post('/venta', authRequired, hasRole, venderProducto);
router.get('/carrito', authRequired, hasRole, getCarrito);
router.post('/guardarBoleta', authRequired, hasRole, guardarCarritoEnBoleta);

export default router;
