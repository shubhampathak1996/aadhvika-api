"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernController = void 0;
const ConcernModel_1 = require("../models/ConcernModel");
class ConcernController {
    // Create a new concern section
    static async createConcernSection(req, res) {
        try {
            const { sectionTag, heading, subHeading, concerns } = req.body;
            if (!heading || !subHeading) {
                return res.status(400).json({
                    success: false,
                    message: 'Heading and sub heading are required.',
                });
            }
            const concernSection = new ConcernModel_1.ConcernModel({
                sectionTag,
                heading,
                subHeading,
                concerns,
            });
            const saved = await concernSection.save();
            res.status(201).json({
                success: true,
                message: 'Concern section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Concern section creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create concern section',
                error: error.message,
            });
        }
    }
    // Get all concern sections with pagination
    static async getConcernSections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [concernSections, total] = await Promise.all([
                ConcernModel_1.ConcernModel.find().skip(skip).limit(limit),
                ConcernModel_1.ConcernModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: concernSections,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern sections',
                error: error.message,
            });
        }
    }
    // Get a single concern section by ID
    static async getConcernSectionById(req, res) {
        try {
            const { id } = req.params;
            const concernSection = await ConcernModel_1.ConcernModel.findById(id);
            if (!concernSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Concern section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: concernSection,
            });
        }
        catch (error) {
            console.error('Get concern section by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern section',
                error: error.message,
            });
        }
    }
    // Update a concern section by ID
    static async updateConcernSection(req, res) {
        try {
            const { id } = req.params;
            const { sectionTag, heading, subHeading, concerns } = req.body;
            const concernSection = await ConcernModel_1.ConcernModel.findByIdAndUpdate(id, { sectionTag, heading, subHeading, concerns }, { new: true, runValidators: true });
            if (!concernSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Concern section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Concern section updated successfully',
                data: concernSection,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update concern section',
                error: error.message,
            });
        }
    }
    // Delete a concern section by ID
    static async deleteConcernSection(req, res) {
        try {
            const { id } = req.params;
            const concernSection = await ConcernModel_1.ConcernModel.findByIdAndDelete(id);
            if (!concernSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Concern section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Concern section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete concern section',
                error: error.message,
            });
        }
    }
}
exports.ConcernController = ConcernController;
