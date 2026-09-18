"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightController = void 0;
const SpotlightModel_1 = __importDefault(require("../models/SpotlightModel"));
class SpotlightController {
    static async getSpotlights(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [spotlights, total] = await Promise.all([
                SpotlightModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                SpotlightModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: spotlights,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to fetch spotlights', error: error.message });
        }
    }
    static async getSpotlightById(req, res) {
        try {
            const { id } = req.params;
            const spotlight = await SpotlightModel_1.default.findById(id);
            if (!spotlight) {
                return res.status(404).json({ message: 'Spotlight not found' });
            }
            res.status(200).json({ success: true, data: spotlight });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to fetch spotlight', error: error.message });
        }
    }
    static async createSpotlight(req, res) {
        try {
            const { badge, title, description, buttonText, buttonLink, stories, isActive, } = req.body;
            if (!title) {
                return res.status(400).json({ message: 'Title is required.' });
            }
            if (!stories || stories.length === 0) {
                return res
                    .status(400)
                    .json({ message: 'At least one story image is required.' });
            }
            const spotlight = await SpotlightModel_1.default.create({
                badge,
                title,
                description,
                buttonText,
                buttonLink,
                stories,
                isActive,
            });
            res.status(201).json({ success: true, data: spotlight });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to create spotlight', error: error.message });
        }
    }
    static async updateSpotlight(req, res) {
        try {
            const { id } = req.params;
            const { badge, title, description, buttonText, buttonLink, stories, isActive, } = req.body;
            const spotlight = await SpotlightModel_1.default.findByIdAndUpdate(id, {
                badge,
                title,
                description,
                buttonText,
                buttonLink,
                stories,
                isActive,
            }, { new: true, runValidators: true });
            if (!spotlight) {
                return res.status(404).json({ message: 'Spotlight not found' });
            }
            res.status(200).json({ success: true, data: spotlight });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to update spotlight', error: error.message });
        }
    }
    static async deleteSpotlight(req, res) {
        try {
            const { id } = req.params;
            const spotlight = await SpotlightModel_1.default.findByIdAndDelete(id);
            if (!spotlight) {
                return res.status(404).json({ message: 'Spotlight not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'Spotlight deleted successfully' });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to delete spotlight', error: error.message });
        }
    }
}
exports.SpotlightController = SpotlightController;
