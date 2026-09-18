"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const NewsModel_1 = __importDefault(require("../models/NewsModel"));
class NewsController {
    static async createNews(req, res) {
        try {
            const { title, description, image, content, slug, publishedDate } = req.body;
            if (!title || !description || !image || !content || !slug) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (title, description, image, content, slug) are required.',
                });
            }
            const news = await NewsModel_1.default.create({
                title,
                description,
                image,
                content,
                slug,
                publishedDate,
            });
            res.status(201).json({ success: true, data: news });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getNewsList(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [news, total] = await Promise.all([
                NewsModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                NewsModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: news,
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
    static async getNewsById(req, res) {
        try {
            const { id } = req.params;
            const news = await NewsModel_1.default.findById(id);
            if (!news) {
                return res
                    .status(404)
                    .json({ success: false, message: 'News not found' });
            }
            res.status(200).json({ success: true, data: news });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateNews(req, res) {
        try {
            const { id } = req.params;
            const { title, description, image, content, slug, publishedDate } = req.body;
            const updatedNews = await NewsModel_1.default.findByIdAndUpdate(id, { title, description, image, content, slug, publishedDate }, { new: true, runValidators: true });
            if (!updatedNews) {
                return res
                    .status(404)
                    .json({ success: false, message: 'News not found' });
            }
            res.status(200).json({ success: true, data: updatedNews });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async deleteNews(req, res) {
        try {
            const { id } = req.params;
            const deletedNews = await NewsModel_1.default.findByIdAndDelete(id);
            if (!deletedNews) {
                return res
                    .status(404)
                    .json({ success: false, message: 'News not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'News deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.NewsController = NewsController;
