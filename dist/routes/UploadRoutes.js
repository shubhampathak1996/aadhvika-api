"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const UploadsController_1 = require("../controllers/UploadsController");
const router = express_1.default.Router();
// Ensure uploads directory exists with absolute path
const uploadsDir = path_1.default.join(process.cwd(), 'uploads');
console.log('Uploads directory path:', uploadsDir);
if (!fs_1.default.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    try {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        console.log('Uploads directory created successfully');
    }
    catch (error) {
        console.error('Error creating uploads directory:', error);
    }
}
else {
    console.log('Uploads directory already exists');
}
// Verify directory permissions
try {
    fs_1.default.accessSync(uploadsDir, fs_1.default.constants.W_OK);
    console.log('Uploads directory is writable');
}
catch (error) {
    console.error('Uploads directory is not writable:', error);
}
// Configure Multer storage
const storage = multer_1.default.diskStorage({
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
const upload = (0, multer_1.default)({
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
const videoUpload = (0, multer_1.default)({
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
router.post('/', (req, res, next) => {
    console.log('Upload request received');
    console.log('Request headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    next();
}, upload.single('image'), UploadsController_1.UploadsController.uploadSingle);
// Route for banner uploads (both desktop and mobile images)
router.post('/banner', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mobileBannerImage', maxCount: 1 },
]), UploadsController_1.UploadsController.uploadBanner);
// Route for multiple gallery uploads
router.post('/gallery', upload.array('images', 10), UploadsController_1.UploadsController.uploadGallery);
// Route to list all uploaded images in the uploads folder
router.get('/list', UploadsController_1.UploadsController.listUploads);
// Route for single video upload
router.post('/video', videoUpload.single('video'), UploadsController_1.UploadsController.uploadVideo);
// Route to delete a single image by filename
router.delete('/:filename', UploadsController_1.UploadsController.deleteSingle);
// Route to delete multiple images by filenames
router.delete('/', UploadsController_1.UploadsController.deleteMultiple);
exports.default = router;
