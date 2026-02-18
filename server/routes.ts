import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Configured:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: !!process.env.CLOUDINARY_API_KEY,
  api_secret: !!process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
  } as any,
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req: any, res: express.Response) => {
  try {
    if (!req.file) {
      console.error('Upload failed: No file provided');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('Upload successful:', req.file.path);
    res.json({ url: req.file.path });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ 
      message: 'Upload failed', 
      error: error.message,
      details: error.http_code ? `Cloudinary error ${error.http_code}` : undefined
    });
  }
});

export default router;
