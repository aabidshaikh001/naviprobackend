import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';
import { uploadQRCode, getLatestQRCode } from '../controllers/qrController.js';

const router = express.Router();

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'qr_codes', // Folder name in Cloudinary
    format: async (req, file) => 'png', // Optional: specify file format
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique public ID
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload-qr', upload.single('file'), uploadQRCode);
router.get('/get-qr', getLatestQRCode);

export default router;
