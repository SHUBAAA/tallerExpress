import { Router } from 'express';
import {

    createProduct,
    getProduct,
    getProductById,
    deleteProductById,
    updateProductById,
} from '../controllers/producto.controller.js';

const router = Router();
router.get('/bodega', getProduct);
router.post('/crearproducto', createProduct);
router.delete('/bodega/:productoid', deleteProductById);
router.put('/modprod/:productoid', updateProductById);
export default router;
