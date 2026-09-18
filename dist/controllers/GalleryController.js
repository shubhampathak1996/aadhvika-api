"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const GalleryModel_1 = __importDefault(require("../models/GalleryModel"));
class GalleryController {
    static async createGallery(req, res) {
        try {
            const { title, type, images } = req.body;
            if (!title ||
                !type ||
                !images ||
                !Array.isArray(images) ||
                images.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Title, type, and at least one image are required.',
                });
            }
            const gallery = await GalleryModel_1.default.create({ title, type, images });
            res.status(201).json({ success: true, data: gallery });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getGalleries(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [galleries, total] = await Promise.all([
                GalleryModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                GalleryModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: galleries,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getGalleryById(req, res) {
        try {
            const { id } = req.params;
            const gallery = await GalleryModel_1.default.findById(id);
            if (!gallery) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Gallery not found' });
            }
            res.status(200).json({ success: true, data: gallery });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateGallery(req, res) {
        try {
            const { id } = req.params;
            const { title, type, images } = req.body;
            const updatedGallery = await GalleryModel_1.default.findByIdAndUpdate(id, { title, type, images }, { new: true, runValidators: true });
            if (!updatedGallery) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Gallery not found' });
            }
            res.status(200).json({ success: true, data: updatedGallery });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async deleteGallery(req, res) {
        try {
            const { id } = req.params;
            const deletedGallery = await GalleryModel_1.default.findByIdAndDelete(id);
            if (!deletedGallery) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Gallery not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'Gallery deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.GalleryController = GalleryController;
