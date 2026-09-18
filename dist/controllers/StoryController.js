"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryController = void 0;
const StoryModel_1 = require("../models/StoryModel");
class StoryController {
    // Create a new stories section
    static async createStoriesSection(req, res) {
        try {
            const { type, enabled, order, data } = req.body;
            if (!data?.heading) {
                return res.status(400).json({
                    success: false,
                    message: 'data.heading is required.',
                });
            }
            const storiesSection = new StoryModel_1.StoryModel({ type, enabled, order, data });
            const saved = await storiesSection.save();
            res.status(201).json({
                success: true,
                message: 'Stories section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Stories section creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create stories section',
                error: error.message,
            });
        }
    }
    // Get all stories sections with pagination
    static async getStoriesSections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [storiesSections, total] = await Promise.all([
                StoryModel_1.StoryModel.find().skip(skip).limit(limit),
                StoryModel_1.StoryModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: storiesSections,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch stories sections',
                error: error.message,
            });
        }
    }
    // Get a single stories section by ID
    static async getStoriesSectionById(req, res) {
        try {
            const { id } = req.params;
            const storiesSection = await StoryModel_1.StoryModel.findById(id);
            if (!storiesSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Stories section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: storiesSection,
            });
        }
        catch (error) {
            console.error('Get stories section by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch stories section',
                error: error.message,
            });
        }
    }
    // Update a stories section by ID
    static async updateStoriesSection(req, res) {
        try {
            const { id } = req.params;
            const { type, enabled, order, data } = req.body;
            const storiesSection = await StoryModel_1.StoryModel.findByIdAndUpdate(id, { type, enabled, order, data }, { new: true, runValidators: true });
            if (!storiesSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Stories section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Stories section updated successfully',
                data: storiesSection,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update stories section',
                error: error.message,
            });
        }
    }
    // Delete a stories section by ID
    static async deleteStoriesSection(req, res) {
        try {
            const { id } = req.params;
            const storiesSection = await StoryModel_1.StoryModel.findByIdAndDelete(id);
            if (!storiesSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Stories section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Stories section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete stories section',
                error: error.message,
            });
        }
    }
}
exports.StoryController = StoryController;
