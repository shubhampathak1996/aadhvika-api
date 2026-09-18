"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintController = void 0;
const BlueprintModel_1 = require("../models/BlueprintModel");
class BlueprintController {
    // Create a new blueprint section
    static async createBlueprintSection(req, res) {
        try {
            const { badgeText, heading, description, steps, isActive } = req.body;
            if (!heading) {
                return res.status(400).json({
                    success: false,
                    message: 'Heading is required.',
                });
            }
            if (!steps || steps.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one step is required.',
                });
            }
            const blueprintSection = new BlueprintModel_1.BlueprintModel({
                badgeText,
                heading,
                description,
                steps,
                isActive,
            });
            const saved = await blueprintSection.save();
            res.status(201).json({
                success: true,
                message: 'Blueprint section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Blueprint section creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create blueprint section',
                error: error.message,
            });
        }
    }
    // Get all blueprint sections with pagination
    static async getBlueprintSections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [blueprintSections, total] = await Promise.all([
                BlueprintModel_1.BlueprintModel.find().skip(skip).limit(limit),
                BlueprintModel_1.BlueprintModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: blueprintSections,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch blueprint sections',
                error: error.message,
            });
        }
    }
    // Get a single blueprint section by ID
    static async getBlueprintSectionById(req, res) {
        try {
            const { id } = req.params;
            const blueprintSection = await BlueprintModel_1.BlueprintModel.findById(id);
            if (!blueprintSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Blueprint section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: blueprintSection,
            });
        }
        catch (error) {
            console.error('Get blueprint section by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch blueprint section',
                error: error.message,
            });
        }
    }
    // Update a blueprint section by ID
    static async updateBlueprintSection(req, res) {
        try {
            const { id } = req.params;
            const blueprintSection = await BlueprintModel_1.BlueprintModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
            if (!blueprintSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Blueprint section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Blueprint section updated successfully',
                data: blueprintSection,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update blueprint section',
                error: error.message,
            });
        }
    }
    // Delete a blueprint section by ID
    static async deleteBlueprintSection(req, res) {
        try {
            const { id } = req.params;
            const blueprintSection = await BlueprintModel_1.BlueprintModel.findByIdAndDelete(id);
            if (!blueprintSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Blueprint section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Blueprint section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete blueprint section',
                error: error.message,
            });
        }
    }
}
exports.BlueprintController = BlueprintController;
