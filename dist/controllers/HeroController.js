"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroController = void 0;
const HeroModel_1 = require("../models/HeroModel");
class HeroController {
    // Create a new hero section
    static async createHero(req, res) {
        try {
            const { id, type, data } = req.body;
            if (!id ||
                type !== 'hero' ||
                !data?.backgroundImage ||
                !data?.heading?.title) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. Required fields: id, type="hero", data.backgroundImage, data.heading.title.',
                });
            }
            const existing = await HeroModel_1.HeroModel.findOne({ id });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: `Hero section with id "${id}" already exists.`,
                    data: existing,
                });
            }
            const hero = new HeroModel_1.HeroModel(req.body);
            const saved = await hero.save();
            res.status(201).json({
                success: true,
                message: 'Hero section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Hero creation error:', error);
            if (error?.code === 11000 && error?.keyPattern?.id) {
                return res.status(409).json({
                    success: false,
                    message: `Hero section with id "${error.keyValue?.id}" already exists.`,
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to create hero section',
                error: error.message,
            });
        }
    }
    // Get all hero sections with pagination
    static async getHeroes(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [heroes, total] = await Promise.all([
                HeroModel_1.HeroModel.find().skip(skip).limit(limit),
                HeroModel_1.HeroModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: heroes,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch hero sections',
                error: error.message,
            });
        }
    }
    // Get a single hero section by custom id (e.g. "hero_1")
    static async getHeroById(req, res) {
        try {
            const { id } = req.params;
            const hero = await HeroModel_1.HeroModel.findOne({ id });
            if (!hero) {
                return res.status(404).json({
                    success: false,
                    message: 'Hero section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: hero,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch hero section',
                error: error.message,
            });
        }
    }
    // Update a hero section by custom id
    static async updateHero(req, res) {
        try {
            const { id } = req.params;
            const { type, data } = req.body;
            if (type !== 'hero' || !data?.backgroundImage || !data?.heading?.title) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. Required fields: type="hero", data.backgroundImage, data.heading.title.',
                });
            }
            const hero = await HeroModel_1.HeroModel.findOneAndUpdate({ id }, req.body, {
                new: true,
                runValidators: true,
            });
            if (!hero) {
                return res.status(404).json({
                    success: false,
                    message: 'Hero section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Hero section updated successfully',
                data: hero,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update hero section',
                error: error.message,
            });
        }
    }
    // Delete a hero section by custom id
    static async deleteHero(req, res) {
        try {
            const { id } = req.params;
            const hero = await HeroModel_1.HeroModel.findOneAndDelete({ id });
            if (!hero) {
                return res.status(404).json({
                    success: false,
                    message: 'Hero section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Hero section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete hero section',
                error: error.message,
            });
        }
    }
}
exports.HeroController = HeroController;
