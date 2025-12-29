import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, createProduct); // Admin only - add admin check later
router.put('/:id', authenticate, updateProduct); // Admin only
router.delete('/:id', authenticate, deleteProduct); // Admin only

export default router;


