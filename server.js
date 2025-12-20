// import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cors from 'cors';

// Initialize dotenv
// dotenv.config();

const app = express();
app.use(cors());

// 1. Cloudinary Configuration
const CLOUD_NAME = 'digcsrmzk'
const CLOUD_API_KEY = 897327652769265
const CLOUD_API_SECRET = 'acEce0dUgKSs2xqyD5BfqWjKjxo'
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

// 2. Multer Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'srmu-docs',
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});

const upload = multer({ storage: storage });

// 3. Upload Route
app.post('/upload', upload.array('files', 10), (req, res) => {
  try {
    console.log("Files uploaded:", req.files);
    
    res.status(200).json({ 
      message: 'Upload successful', 
      data: req.files 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));