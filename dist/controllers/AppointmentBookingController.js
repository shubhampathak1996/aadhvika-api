"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBookingController = void 0;
const AppointmentBookingModel_1 = __importDefault(require("../models/AppointmentBookingModel"));
class AppointmentBookingController {
    // Public: submit a booking request
    static async createBooking(req, res) {
        try {
            const { fullName, phone, enquiryFor, comments, consent } = req.body;
            if (!fullName || !phone || !enquiryFor || consent === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Full name, phone, enquiry type and consent are required.',
                });
            }
            if (!consent) {
                return res.status(400).json({
                    success: false,
                    message: 'You must agree to continue.',
                });
            }
            const booking = await AppointmentBookingModel_1.default.create({
                fullName,
                phone,
                enquiryFor,
                comments,
                consent,
            });
            res.status(201).json({
                success: true,
                message: 'Appointment request submitted successfully.',
                data: booking,
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
                message: 'Failed to submit appointment request',
                error: error.message,
            });
        }
    }
    // Admin: get all bookings with pagination and filters
    static async getAllBookings(req, res) {
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
            const [bookings, total] = await Promise.all([
                AppointmentBookingModel_1.default.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                AppointmentBookingModel_1.default.countDocuments(filter),
            ]);
            res.status(200).json({
                success: true,
                data: bookings,
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
                message: 'Failed to fetch appointment bookings',
                error: error.message,
            });
        }
    }
    // Admin: get single booking by ID
    static async getBookingById(req, res) {
        try {
            const { id } = req.params;
            const booking = await AppointmentBookingModel_1.default.findById(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment booking not found',
                });
            }
            res.status(200).json({ success: true, data: booking });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch appointment booking',
                error: error.message,
            });
        }
    }
    // Admin: mark as read / update status
    static async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const { isRead, status } = req.body;
            const booking = await AppointmentBookingModel_1.default.findByIdAndUpdate(id, { isRead, status }, { new: true, runValidators: true });
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment booking not found',
                });
            }
            res.status(200).json({ success: true, data: booking });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update appointment booking',
                error: error.message,
            });
        }
    }
    // Admin: delete booking
    static async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await AppointmentBookingModel_1.default.findByIdAndDelete(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment booking not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Appointment booking deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete appointment booking',
                error: error.message,
            });
        }
    }
}
exports.AppointmentBookingController = AppointmentBookingController;
