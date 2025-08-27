// backend/api/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from '../routes/productRoutes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import serverless from 'serverless-http';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// __dirname pentru ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);

// Upload endpoint
const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, path.join(__dirname, '../uploads')); },
  filename(req, file, cb) { cb(null, `${Date.now()}${path.extname(file.originalname)}`); },
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ imagePath: `/uploads/${req.file.filename}` });
});

// Test route
app.get('/', (req, res) => res.send('✅ API is running...'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Export serverless handler
export const handler = serverless(app);
