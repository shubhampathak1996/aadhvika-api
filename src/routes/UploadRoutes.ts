import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UploadsController } from '../controllers/UploadsController';

const router = express.Router();

// Ensure uploads directory exists with absolute path
const uploadsDir = path.join(process.cwd(), 'uploads');
console.log('Uploads directory path:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully');
  } catch (error) {
    console.error('Error creating uploads directory:', error);
  }
} else {
  console.log('Uploads directory already exists');
}

// Verify directory permissions
try {
  fs.accessSync(uploadsDir, fs.constants.W_OK);
  console.log('Uploads directory is writable');
} catch (error) {
  console.error('Uploads directory is not writable:', error);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer destination called for file:', file.originalname);
    console.log('Saving to directory:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

// Configure multer with file filtering and limits
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

// Configure Multer storage for videos (25 MB limit)
const videoUpload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(mp4|mov|webm|avi|mkv)$/i)) {
      return cb(new Error('Only video files are allowed (mp4, mov, webm)!'));
    }
    cb(null, true);
  },
});
router.post(
  '/',
  (req: Request, res: Response, next) => {
    console.log('Upload request received');
    console.log('Request headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    next();
  },
  upload.single('image'),
  UploadsController.uploadSingle,
);

// Route for banner uploads (both desktop and mobile images)
router.post(
  '/banner',
  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mobileBannerImage', maxCount: 1 },
  ]),
  UploadsController.uploadBanner,
);

// Route for multiple gallery uploads
router.post(
  '/gallery',
  upload.array('images', 10),
  UploadsController.uploadGallery,
);

// Route to list all uploaded images in the uploads folder
router.get('/list', UploadsController.listUploads);

// Route for single video upload
router.post(
  '/video',
  videoUpload.single('video'),
  UploadsController.uploadVideo,
);

// Route to delete a single image by filename
router.delete('/:filename', UploadsController.deleteSingle);

// Route to delete multiple images by filenames
router.delete('/', UploadsController.deleteMultiple);

export default router;
