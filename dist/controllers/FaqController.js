"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqController = void 0;
const FaqModel_1 = __importDefault(require("../models/FaqModel"));
class FaqController {
    static async getFaqs(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [faqs, total] = await Promise.all([
                FaqModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                FaqModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: faqs,
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
                message: 'Failed to fetch FAQ sections',
                error: error.message,
            });
        }
    }
    static async getFaqById(req, res) {
        try {
            const { id } = req.params;
            const faq = await FaqModel_1.default.findById(id);
            if (!faq) {
                return res
                    .status(404)
                    .json({ success: false, message: 'FAQ section not found' });
            }
            res.status(200).json({ success: true, data: faq });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch FAQ section',
                error: error.message,
            });
        }
    }
    static async createFaq(req, res) {
        try {
            const { badge, title, contactTitle, contactDescription, buttonText, buttonLink, isActive, faqs, } = req.body;
            if (!title) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Title is required.' });
            }
            if (!faqs || faqs.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one FAQ item is required.',
                });
            }
            const faq = await FaqModel_1.default.create({
                badge,
                title,
                contactTitle,
                contactDescription,
                buttonText,
                buttonLink,
                isActive,
                faqs,
            });
            res.status(201).json({ success: true, data: faq });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create FAQ section',
                error: error.message,
            });
        }
    }
    static async updateFaq(req, res) {
        try {
            const { id } = req.params;
            const { badge, title, contactTitle, contactDescription, buttonText, buttonLink, isActive, faqs, } = req.body;
            const faq = await FaqModel_1.default.findByIdAndUpdate(id, {
                badge,
                title,
                contactTitle,
                contactDescription,
                buttonText,
                buttonLink,
                isActive,
                faqs,
            }, { new: true, runValidators: true });
            if (!faq) {
                return res
                    .status(404)
                    .json({ success: false, message: 'FAQ section not found' });
            }
            res.status(200).json({ success: true, data: faq });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update FAQ section',
                error: error.message,
            });
        }
    }
    static async deleteFaq(req, res) {
        try {
            const { id } = req.params;
            const faq = await FaqModel_1.default.findByIdAndDelete(id);
            if (!faq) {
                return res
                    .status(404)
                    .json({ success: false, message: 'FAQ section not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'FAQ section deleted successfully' });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete FAQ section',
                error: error.message,
            });
        }
    }
}
exports.FaqController = FaqController;
