"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutController = void 0;
const AboutModel_1 = require("../models/AboutModel");
class AboutController {
    // Create a new about section
    static async createAbout(req, res) {
        try {
            const { id, type, data } = req.body;
            if (!id || type !== 'about' || !data?.title || !data?.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. Required fields: id, type="about", data.title, data.description.',
                });
            }
            const existing = await AboutModel_1.AboutModel.findOne({ id });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: `About section with id "${id}" already exists.`,
                    data: existing,
                });
            }
            const about = new AboutModel_1.AboutModel(req.body);
            const saved = await about.save();
            res.status(201).json({
                success: true,
                message: 'About section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('About creation error:', error);
            if (error?.code === 11000 && error?.keyPattern?.id) {
                return res.status(409).json({
                    success: false,
                    message: `About section with id "${error.keyValue?.id}" already exists.`,
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to create about section',
                error: error.message,
            });
        }
    }
    // Get all about sections with pagination
    static async getAbouts(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [abouts, total] = await Promise.all([
                AboutModel_1.AboutModel.find().skip(skip).limit(limit),
                AboutModel_1.AboutModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: abouts,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch about sections',
                error: error.message,
            });
        }
    }
    // Get a single about section by custom id
    static async getAboutById(req, res) {
        try {
            const { id } = req.params;
            const about = await AboutModel_1.AboutModel.findOne({ id });
            if (!about) {
                return res.status(404).json({
                    success: false,
                    message: 'About section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: about,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch about section',
                error: error.message,
            });
        }
    }
    // Update an about section by custom id
    static async updateAbout(req, res) {
        try {
            const { id } = req.params;
            const { type, data } = req.body;
            if (type !== 'about' || !data?.title || !data?.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. Required fields: type="about", data.title, data.description.',
                });
            }
            const about = await AboutModel_1.AboutModel.findOneAndUpdate({ id }, req.body, {
                new: true,
                runValidators: true,
            });
            if (!about) {
                return res.status(404).json({
                    success: false,
                    message: 'About section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'About section updated successfully',
                data: about,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update about section',
                error: error.message,
            });
        }
    }
    // Delete an about section by custom id
    static async deleteAbout(req, res) {
        try {
            const { id } = req.params;
            const about = await AboutModel_1.AboutModel.findOneAndDelete({ id });
            if (!about) {
                return res.status(404).json({
                    success: false,
                    message: 'About section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'About section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete about section',
                error: error.message,
            });
        }
    }
}
exports.AboutController = AboutController;
