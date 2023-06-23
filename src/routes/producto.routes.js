import { Router } from 'express';
import {
    createProduct,
    getProduct,
    deleteProductById,
    updateProductById,
} from '../controllers/producto.controller.js';

const router = Router();
router.get('/bodega', getProduct);
router.post('/crearproducto', createProduct);
router.delete('/bodega/:productId', deleteProductById);
router.put('/modprod/:productId', updateProductById);
export default router;
