"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const EventModel_1 = __importDefault(require("../models/EventModel"));
class EventsController {
    static async createEvent(req, res) {
        try {
            const { title, description, image, content, slug, publishedDate } = req.body;
            if (!title || !description || !image || !content || !slug) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (title, description, image, content, slug) are required.',
                });
            }
            const event = await EventModel_1.default.create({
                title,
                description,
                image,
                content,
                slug,
                publishedDate,
            });
            res.status(201).json({ success: true, data: event });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getEventsList(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [events, total] = await Promise.all([
                EventModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                EventModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: events,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getEventById(req, res) {
        try {
            const { id } = req.params;
            const event = await EventModel_1.default.findById(id);
            if (!event) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Event not found' });
            }
            res.status(200).json({ success: true, data: event });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const { title, description, image, content, slug, publishedDate } = req.body;
            const updatedEvent = await EventModel_1.default.findByIdAndUpdate(id, { title, description, image, content, slug, publishedDate }, { new: true, runValidators: true });
            if (!updatedEvent) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Event not found' });
            }
            res.status(200).json({ success: true, data: updatedEvent });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            const deletedEvent = await EventModel_1.default.findByIdAndDelete(id);
            if (!deletedEvent) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Event not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'Event deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.EventsController = EventsController;
