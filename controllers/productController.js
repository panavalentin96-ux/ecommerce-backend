// controllers/productController.js
import Product from '../models/product.js'; // Folosește numele corect al fișierului

// GET /api/products – returnează toate produsele
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// GET /api/products/:id – returnează un produs după ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error fetching product by ID:', err.message);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// POST /api/products – creează un produs nou
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    // Verificare minimă
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// PUT /api/products/:id – actualizează un produs existent
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.image = image || product.image;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

