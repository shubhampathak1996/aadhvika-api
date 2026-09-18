"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesController = void 0;
const ServicesModel_1 = require("../models/ServicesModel");
const ServiceSchema_1 = require("../validations/ServiceSchema");
const slugify_1 = __importDefault(require("slugify"));
class ServicesController {
    // Create a new service
    static async createService(req, res) {
        try {
            const validatedData = ServiceSchema_1.CreateServiceSchema.parse(req.body);
            // Generate slug from title if not provided
            if (!validatedData.slug) {
                validatedData.slug = (0, slugify_1.default)(validatedData.title, {
                    lower: true,
                    strict: true,
                });
            }
            const service = await ServicesModel_1.ServiceModel.create(validatedData);
            res.status(201).json({
                success: true,
                message: 'Service created successfully',
                data: service,
            });
        }
        catch (error) {
            console.error('Create service error:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to create service',
                errors: error.errors || undefined,
            });
        }
    }
    // Get all services with pagination and filtering
    static async getServicesList(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const search = req.query.search;
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            const skip = (page - 1) * limit;
            // Build filter query
            const filter = {};
            if (status) {
                filter.status = status;
            }
            if (search) {
                filter.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { bannerTitle: { $regex: search, $options: 'i' } },
                ];
            }
            const [services, total] = await Promise.all([
                ServicesModel_1.ServiceModel.find(filter)
                    .sort({ [sortBy]: sortOrder })
                    .skip(skip)
                    .limit(limit),
                ServicesModel_1.ServiceModel.countDocuments(filter),
            ]);
            res.status(200).json({
                success: true,
                data: services,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit,
                },
            });
        }
        catch (error) {
            console.error('Get services list error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch services',
            });
        }
    }
    // Get a single service by ID
    static async getServiceById(req, res) {
        try {
            const { id } = req.params;
            const service = await ServicesModel_1.ServiceModel.findById(id);
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            res.status(200).json({
                success: true,
                data: service,
            });
        }
        catch (error) {
            console.error('Get service by ID error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch service',
            });
        }
    }
    // Get a service by slug
    static async getServiceBySlug(req, res) {
        try {
            const { slug } = req.params;
            const normalizedSlug = (0, slugify_1.default)(slug, {
                lower: true,
                strict: true,
            });
            const service = await ServicesModel_1.ServiceModel.findOne({ slug: normalizedSlug });
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            res.status(200).json({
                success: true,
                data: service,
            });
        }
        catch (error) {
            console.error('Get service by slug error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch service',
            });
        }
    }
    // Update a service
    static async updateService(req, res) {
        try {
            const { id } = req.params;
            const validatedData = ServiceSchema_1.UpdateServiceSchema.parse(req.body);
            // Update slug if title is changed
            if (validatedData.title && !validatedData.slug) {
                validatedData.slug = (0, slugify_1.default)(validatedData.title, {
                    lower: true,
                    strict: true,
                });
            }
            const updatedService = await ServicesModel_1.ServiceModel.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
            if (!updatedService) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Service updated successfully',
                data: updatedService,
            });
        }
        catch (error) {
            console.error('Update service error:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to update service',
                errors: error.errors || undefined,
            });
        }
    }
    // Delete a service
    static async deleteService(req, res) {
        try {
            const { id } = req.params;
            const deletedService = await ServicesModel_1.ServiceModel.findByIdAndDelete(id);
            if (!deletedService) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Service deleted successfully',
                data: deletedService,
            });
        }
        catch (error) {
            console.error('Delete service error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to delete service',
            });
        }
    }
    // Get published services only (for public-facing API)
    static async getPublishedServices(req, res) {
        try {
            const services = await ServicesModel_1.ServiceModel.find({ status: 'published' }).sort({
                createdAt: -1,
            });
            res.status(200).json({
                success: true,
                data: services,
            });
        }
        catch (error) {
            console.error('Get published services error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch published services',
            });
        }
    }
    static async getServiceBasePath(req, res) {
        try {
            const { slug, basePath } = req.params;
            const service = await ServicesModel_1.ServiceModel.findOne({
                basePath,
                slug,
                status: 'published',
            });
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: 'Service not found',
                });
            }
            res.status(200).json({
                success: true,
                data: { basePath: service.basePath },
            });
        }
        catch (error) {
            console.error('Get service base path error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch service base path',
            });
        }
    }
    // Migration: Add basePath to existing services without it
    static async migrateBasePath(req, res) {
        try {
            const result = await ServicesModel_1.ServiceModel.updateMany({ basePath: { $exists: false } }, // Find services without basePath
            { $set: { basePath: 'services' } });
            res.status(200).json({
                success: true,
                message: `Migration completed. Updated ${result.modifiedCount} service(s) with default basePath.`,
                data: {
                    matched: result.matchedCount,
                    modified: result.modifiedCount,
                },
            });
        }
        catch (error) {
            console.error('Migration error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Migration failed',
            });
        }
    }
}
exports.ServicesController = ServicesController;
