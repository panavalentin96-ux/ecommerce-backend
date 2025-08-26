import Product from '../models/Product.js';

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, countInStock } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl, countInStock });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
