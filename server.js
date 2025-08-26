import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import multer from 'multer';
import path from 'path';
<<<<<<< HEAD
import { fileURLToPath } from 'url';
=======
>>>>>>> ead03fe29cfe268e006affed5892bba2c1c6dbbb

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD

// Obține __dirname pentru ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servește fișiere statice din uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
=======
app.use('/uploads', express.static('uploads')); // folderul uploads static
>>>>>>> ead03fe29cfe268e006affed5892bba2c1c6dbbb

// Routes
app.use('/api/products', productRoutes);

// Upload endpoint
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
<<<<<<< HEAD

const upload = multer({ storage });

=======
const upload = multer({ storage });
>>>>>>> ead03fe29cfe268e006affed5892bba2c1c6dbbb
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ imagePath: `/uploads/${req.file.filename}` });
});

// Test route
<<<<<<< HEAD
app.get('/', (req, res) => res.send('✅ API is running...'));

// Conectare la MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Portul este dat de Vercel (process.env.PORT)
=======
app.get('/', (req, res) => res.send('API is running...'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
>>>>>>> ead03fe29cfe268e006affed5892bba2c1c6dbbb
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
