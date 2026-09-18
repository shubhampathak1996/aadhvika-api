"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyController = void 0;
const TechnologyModel_1 = require("../models/TechnologyModel");
class TechnologyController {
    // Create a new technology section
    static async createTechnologySection(req, res) {
        try {
            const { type, enabled, order, data } = req.body;
            if (!data?.heading || !data?.subHeading) {
                return res.status(400).json({
                    success: false,
                    message: 'data.heading and data.subHeading are required.',
                });
            }
            const technologySection = new TechnologyModel_1.TechnologyModel({
                type,
                enabled,
                order,
                data,
            });
            const saved = await technologySection.save();
            res.status(201).json({
                success: true,
                message: 'Technology section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Technology section creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create technology section',
                error: error.message,
            });
        }
    }
    // Get all technology sections with pagination
    static async getTechnologySections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [technologySections, total] = await Promise.all([
                TechnologyModel_1.TechnologyModel.find().skip(skip).limit(limit),
                TechnologyModel_1.TechnologyModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: technologySections,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch technology sections',
                error: error.message,
            });
        }
    }
    // Get a single technology section by ID
    static async getTechnologySectionById(req, res) {
        try {
            const { id } = req.params;
            const technologySection = await TechnologyModel_1.TechnologyModel.findById(id);
            if (!technologySection) {
                return res.status(404).json({
                    success: false,
                    message: 'Technology section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: technologySection,
            });
        }
        catch (error) {
            console.error('Get technology section by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch technology section',
                error: error.message,
            });
        }
    }
    // Update a technology section by ID
    static async updateTechnologySection(req, res) {
        try {
            const { id } = req.params;
            const { type, enabled, order, data } = req.body;
            const technologySection = await TechnologyModel_1.TechnologyModel.findByIdAndUpdate(id, { type, enabled, order, data }, { new: true, runValidators: true });
            if (!technologySection) {
                return res.status(404).json({
                    success: false,
                    message: 'Technology section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Technology section updated successfully',
                data: technologySection,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update technology section',
                error: error.message,
            });
        }
    }
    // Delete a technology section by ID
    static async deleteTechnologySection(req, res) {
        try {
            const { id } = req.params;
            const technologySection = await TechnologyModel_1.TechnologyModel.findByIdAndDelete(id);
            if (!technologySection) {
                return res.status(404).json({
                    success: false,
                    message: 'Technology section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Technology section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete technology section',
                error: error.message,
            });
        }
    }
}
exports.TechnologyController = TechnologyController;
