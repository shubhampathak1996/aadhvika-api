"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const AppointmentModel_1 = __importDefault(require("../models/AppointmentModel"));
class AppointmentController {
    static async getAppointments(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [appointments, total] = await Promise.all([
                AppointmentModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                AppointmentModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: appointments,
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
                message: 'Failed to fetch appointment sections',
                error: error.message,
            });
        }
    }
    static async getAppointmentById(req, res) {
        try {
            const { id } = req.params;
            const appointment = await AppointmentModel_1.default.findById(id);
            if (!appointment) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Appointment section not found' });
            }
            res.status(200).json({ success: true, data: appointment });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch appointment section',
                error: error.message,
            });
        }
    }
    static async createAppointment(req, res) {
        try {
            const { badge, title, description, image, formTitle, formDescription, agreementText, responseText, buttonText, contactTitle, phone, email, isActive, } = req.body;
            if (!title) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Title is required.' });
            }
            const appointment = await AppointmentModel_1.default.create({
                badge,
                title,
                description,
                image,
                formTitle,
                formDescription,
                agreementText,
                responseText,
                buttonText,
                contactTitle,
                phone,
                email,
                isActive,
            });
            res.status(201).json({ success: true, data: appointment });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create appointment section',
                error: error.message,
            });
        }
    }
    static async updateAppointment(req, res) {
        try {
            const { id } = req.params;
            const { badge, title, description, image, formTitle, formDescription, agreementText, responseText, buttonText, contactTitle, phone, email, isActive, } = req.body;
            const appointment = await AppointmentModel_1.default.findByIdAndUpdate(id, {
                badge,
                title,
                description,
                image,
                formTitle,
                formDescription,
                agreementText,
                responseText,
                buttonText,
                contactTitle,
                phone,
                email,
                isActive,
            }, { new: true, runValidators: true });
            if (!appointment) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Appointment section not found' });
            }
            res.status(200).json({ success: true, data: appointment });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update appointment section',
                error: error.message,
            });
        }
    }
    static async deleteAppointment(req, res) {
        try {
            const { id } = req.params;
            const appointment = await AppointmentModel_1.default.findByIdAndDelete(id);
            if (!appointment) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Appointment section not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Appointment section deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete appointment section',
                error: error.message,
            });
        }
    }
}
exports.AppointmentController = AppointmentController;
