"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderController = void 0;
const FounderModel_1 = require("../models/FounderModel");
class FounderController {
    // Create a new founder section
    static async createFounderSection(req, res) {
        try {
            const { badgeText, heading, quote, description, founderName, founderRole, image, buttonText, buttonLink, isActive, } = req.body;
            if (!heading) {
                return res.status(400).json({
                    success: false,
                    message: 'Heading is required.',
                });
            }
            const founderSection = new FounderModel_1.FounderModel({
                badgeText,
                heading,
                quote,
                description,
                founderName,
                founderRole,
                image,
                buttonText,
                buttonLink,
                isActive,
            });
            const saved = await founderSection.save();
            res.status(201).json({
                success: true,
                message: 'Founder section created successfully',
                data: saved,
            });
        }
        catch (error) {
            console.error('Founder section creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create founder section',
                error: error.message,
            });
        }
    }
    // Get all founder sections with pagination
    static async getFounderSections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [founderSections, total] = await Promise.all([
                FounderModel_1.FounderModel.find().skip(skip).limit(limit),
                FounderModel_1.FounderModel.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: founderSections,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch founder sections',
                error: error.message,
            });
        }
    }
    // Get a single founder section by ID
    static async getFounderSectionById(req, res) {
        try {
            const { id } = req.params;
            const founderSection = await FounderModel_1.FounderModel.findById(id);
            if (!founderSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Founder section not found',
                });
            }
            res.status(200).json({
                success: true,
                data: founderSection,
            });
        }
        catch (error) {
            console.error('Get founder section by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch founder section',
                error: error.message,
            });
        }
    }
    // Update a founder section by ID
    static async updateFounderSection(req, res) {
        try {
            const { id } = req.params;
            const founderSection = await FounderModel_1.FounderModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
            if (!founderSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Founder section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Founder section updated successfully',
                data: founderSection,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update founder section',
                error: error.message,
            });
        }
    }
    // Delete a founder section by ID
    static async deleteFounderSection(req, res) {
        try {
            const { id } = req.params;
            const founderSection = await FounderModel_1.FounderModel.findByIdAndDelete(id);
            if (!founderSection) {
                return res.status(404).json({
                    success: false,
                    message: 'Founder section not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Founder section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete founder section',
                error: error.message,
            });
        }
    }
}
exports.FounderController = FounderController;
