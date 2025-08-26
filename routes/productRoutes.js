import express from 'express';
import { getProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);      // GET /api/products
router.post('/', createProduct);   // POST /api/products

export default router;
