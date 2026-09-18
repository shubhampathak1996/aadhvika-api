"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiryController = void 0;
const EnquiryModel_1 = __importDefault(require("../models/EnquiryModel"));
class EnquiryController {
    // Public: submit an enquiry request
    static async createEnquiry(req, res) {
        try {
            const { fullName, phone, service, email, brief, consent, website } = req.body;
            // Honeypot check: Bots fill website field, real users leave it empty
            if (website) {
                return res.status(200).json({
                    success: true,
                    message: 'Enquiry submitted successfully.',
                });
            }
            if (!fullName || !phone || !service || consent === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, phone, service and consent are required.',
                });
            }
            if (!consent) {
                return res.status(400).json({
                    success: false,
                    message: 'You must agree to continue.',
                });
            }
            const enquiry = await EnquiryModel_1.default.create({
                fullName,
                phone,
                service,
                email: email || undefined,
                brief: brief || undefined,
                consent,
            });
            res.status(201).json({
                success: true,
                message: 'Enquiry submitted successfully.',
                data: enquiry,
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
                message: 'Failed to submit enquiry',
                error: error.message,
            });
        }
    }
    // Admin: get all enquiries with pagination and filters
    static async getAllEnquiries(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const status = req.query.status;
            const isRead = req.query.isRead;
            const filter = {};
            if (status)
                filter.status = status;
            if (isRead !== undefined)
                filter.isRead = isRead === 'true';
            const [enquiries, total] = await Promise.all([
                EnquiryModel_1.default.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                EnquiryModel_1.default.countDocuments(filter),
            ]);
            res.status(200).json({
                success: true,
                data: enquiries,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch enquiries',
                error: error.message,
            });
        }
    }
    // Admin: get single enquiry by ID
    static async getEnquiryById(req, res) {
        try {
            const { id } = req.params;
            const enquiry = await EnquiryModel_1.default.findById(id);
            if (!enquiry) {
                return res.status(404).json({
                    success: false,
                    message: 'Enquiry not found',
                });
            }
            res.status(200).json({ success: true, data: enquiry });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch enquiry',
                error: error.message,
            });
        }
    }
    // Admin: mark as read / update status
    static async updateEnquiry(req, res) {
        try {
            const { id } = req.params;
            const { isRead, status } = req.body;
            const enquiry = await EnquiryModel_1.default.findByIdAndUpdate(id, { isRead, status }, { new: true, runValidators: true });
            if (!enquiry) {
                return res.status(404).json({
                    success: false,
                    message: 'Enquiry not found',
                });
            }
            res.status(200).json({ success: true, data: enquiry });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update enquiry',
                error: error.message,
            });
        }
    }
    // Admin: delete enquiry
    static async deleteEnquiry(req, res) {
        try {
            const { id } = req.params;
            const enquiry = await EnquiryModel_1.default.findByIdAndDelete(id);
            if (!enquiry) {
                return res.status(404).json({
                    success: false,
                    message: 'Enquiry not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Enquiry deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete enquiry',
                error: error.message,
            });
        }
    }
}
exports.EnquiryController = EnquiryController;
