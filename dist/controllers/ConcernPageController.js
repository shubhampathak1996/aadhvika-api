"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernPageController = void 0;
const ConcernPageModel_1 = __importDefault(require("../models/ConcernPageModel"));
class ConcernPageController {
    static async getConcernPages(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [pages, total] = await Promise.all([
                ConcernPageModel_1.default.find()
                    .populate('categories')
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                ConcernPageModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: pages,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern pages',
                error: error.message,
            });
        }
    }
    static async getConcernPageById(req, res) {
        try {
            const { id } = req.params;
            const page = await ConcernPageModel_1.default.findById(id).populate('categories');
            if (!page) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern page not found' });
            }
            res.status(200).json({ success: true, data: page });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern page',
                error: error.message,
            });
        }
    }
    static async getConcernPageBySlug(req, res) {
        try {
            const { slug } = req.params;
            const page = await ConcernPageModel_1.default.findOne({ slug }).populate('categories');
            if (!page) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern page not found' });
            }
            res.status(200).json({ success: true, data: page });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern page',
                error: error.message,
            });
        }
    }
    static async createConcernPage(req, res) {
        try {
            const { badge, title, heroImage, categories, sections, skinSuiteSection, resultGallerySection, faqSection, } = req.body;
            if (!title) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Title is required.' });
            }
            if (!heroImage) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Hero image is required.' });
            }
            const concernPage = await ConcernPageModel_1.default.create({
                badge,
                title,
                heroImage,
                categories,
                sections,
                skinSuiteSection,
                resultGallerySection,
                faqSection,
            });
            res.status(201).json({ success: true, data: concernPage });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create concern page',
                error: error.message,
            });
        }
    }
    static async updateConcernPage(req, res) {
        try {
            const { id } = req.params;
            const { badge, title, heroImage, categories, sections, skinSuiteSection, resultGallerySection, faqSection, } = req.body;
            const concernPage = await ConcernPageModel_1.default.findByIdAndUpdate(id, {
                badge,
                title,
                heroImage,
                categories,
                sections,
                skinSuiteSection,
                resultGallerySection,
                faqSection,
            }, { new: true, runValidators: true }).populate('categories');
            if (!concernPage) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern page not found' });
            }
            res.status(200).json({ success: true, data: concernPage });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update concern page',
                error: error.message,
            });
        }
    }
    static async deleteConcernPage(req, res) {
        try {
            const { id } = req.params;
            const concernPage = await ConcernPageModel_1.default.findByIdAndDelete(id);
            if (!concernPage) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern page not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Concern page deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete concern page',
                error: error.message,
            });
        }
    }
}
exports.ConcernPageController = ConcernPageController;
