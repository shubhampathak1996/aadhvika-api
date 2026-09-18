"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    image: { type: String, trim: true },
    buttonText: { type: String, trim: true },
    buttonLink: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const BannerModel = mongoose_1.models.Banner || (0, mongoose_1.model)('Banner', BannerSchema);
class BannerController {
    static async getBanners(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.max(1, parseInt(req.query.limit) || 10);
            const [data, total] = await Promise.all([
                BannerModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                BannerModel.countDocuments(),
            ]);
            res
                .status(200)
                .json({
                success: true,
                data,
                total,
                page,
                pages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res
                .status(500)
                .json({
                success: false,
                message: 'Failed to fetch banners',
                error: error.message,
            });
        }
    }
    static async getBannerById(req, res) {
        try {
            const doc = await BannerModel.findById(req.params.id);
            if (!doc)
                return res
                    .status(404)
                    .json({ success: false, message: 'Banner not found' });
            res.status(200).json({ success: true, data: doc });
        }
        catch (error) {
            res
                .status(500)
                .json({
                success: false,
                message: 'Failed to fetch banner',
                error: error.message,
            });
        }
    }
    static async getBanner(req, res) {
        return BannerController.getBannerById(req, res);
    }
    static async createBanner(req, res) {
        try {
            const doc = await BannerModel.create(req.body);
            res.status(201).json({ success: true, data: doc });
        }
        catch (error) {
            res
                .status(500)
                .json({
                success: false,
                message: 'Failed to create banner',
                error: error.message,
            });
        }
    }
    static async updateBanner(req, res) {
        try {
            const doc = await BannerModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!doc)
                return res
                    .status(404)
                    .json({ success: false, message: 'Banner not found' });
            res
                .status(200)
                .json({
                success: true,
                data: doc,
                message: 'Banner updated successfully',
            });
        }
        catch (error) {
            res
                .status(500)
                .json({
                success: false,
                message: 'Failed to update banner',
                error: error.message,
            });
        }
    }
    static async deleteBanner(req, res) {
        try {
            const doc = await BannerModel.findByIdAndDelete(req.params.id);
            if (!doc)
                return res
                    .status(404)
                    .json({ success: false, message: 'Banner not found' });
            res
                .status(200)
                .json({ success: true, message: 'Banner deleted successfully' });
        }
        catch (error) {
            res
                .status(500)
                .json({
                success: false,
                message: 'Failed to delete banner',
                error: error.message,
            });
        }
    }
}
exports.BannerController = BannerController;
exports.default = BannerController;
