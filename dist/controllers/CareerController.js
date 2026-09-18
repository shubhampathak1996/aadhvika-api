"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerController = void 0;
const CareerModel_1 = require("../models/CareerModel");
class CareerController {
    // Create a new career application
    static async createCareerApplication(req, res) {
        try {
            const { fullName, email, phone, roleInterest, message, consent } = req.body;
            if (!fullName ||
                !email ||
                !phone ||
                !roleInterest ||
                consent === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'All required fields must be provided',
                });
            }
            const newApplication = new CareerModel_1.CareerModel({
                fullName,
                email,
                phone,
                roleInterest,
                message,
                consent,
            });
            const savedApplication = await newApplication.save();
            res.status(201).json({
                success: true,
                message: 'Career application submitted successfully',
                data: savedApplication,
            });
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map((err) => err.message);
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors,
                });
            }
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to submit career application',
            });
        }
    }
    // Get all career applications (for admin)
    static async getAllApplications(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const isRead = req.query.isRead;
            const roleInterest = req.query.roleInterest;
            const skip = (page - 1) * limit;
            const filter = {};
            if (status)
                filter.status = status;
            if (isRead !== undefined)
                filter.isRead = isRead === 'true';
            if (roleInterest)
                filter.roleInterest = roleInterest;
            const [applications, totalApplications] = await Promise.all([
                CareerModel_1.CareerModel.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                CareerModel_1.CareerModel.countDocuments(filter),
            ]);
            const totalPages = Math.ceil(totalApplications / limit);
            res.status(200).json({
                success: true,
                data: {
                    applications,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalApplications,
                        hasNextPage: page < totalPages,
                        hasPrevPage: page > 1,
                    },
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get single application by ID
    static async getApplicationById(req, res) {
        try {
            const { id } = req.params;
            const application = await CareerModel_1.CareerModel.findById(id);
            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: 'Career application not found',
                });
            }
            res.status(200).json({
                success: true,
                data: application,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Update application status (for admin)
    static async updateApplicationStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, isRead } = req.body;
            const updateData = {};
            if (status)
                updateData.status = status;
            if (isRead !== undefined)
                updateData.isRead = isRead;
            const updatedApplication = await CareerModel_1.CareerModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            if (!updatedApplication) {
                return res.status(404).json({
                    success: false,
                    message: 'Career application not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Application updated successfully',
                data: updatedApplication,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Mark application as read
    static async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const updatedApplication = await CareerModel_1.CareerModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
            if (!updatedApplication) {
                return res.status(404).json({
                    success: false,
                    message: 'Career application not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Application marked as read',
                data: updatedApplication,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Delete application (for admin)
    static async deleteApplication(req, res) {
        try {
            const { id } = req.params;
            const deletedApplication = await CareerModel_1.CareerModel.findByIdAndDelete(id);
            if (!deletedApplication) {
                return res.status(404).json({
                    success: false,
                    message: 'Career application not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Career application deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.CareerController = CareerController;
