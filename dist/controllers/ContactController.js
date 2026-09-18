"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const ContactModel_1 = require("../models/ContactModel");
class ContactController {
    // Create a new contact message
    static async createContact(req, res) {
        try {
            const { name, phone, email, query } = req.body;
            // Validate required fields
            if (!name || !phone || !email || !query) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required',
                });
            }
            // Create new contact
            const newContact = new ContactModel_1.ContactModel({
                name,
                phone,
                email,
                query,
            });
            const savedContact = await newContact.save();
            res.status(201).json({
                success: true,
                message: 'Contact message sent successfully',
                data: savedContact,
            });
        }
        catch (error) {
            // Handle validation errors
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
                message: error.message || 'Failed to create contact',
            });
        }
    }
    // Get all contact messages (for admin)
    static async getAllContacts(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const isRead = req.query.isRead;
            const skip = (page - 1) * limit;
            // Build filter object
            const filter = {};
            if (status)
                filter.status = status;
            if (isRead !== undefined)
                filter.isRead = isRead === 'true';
            const [contacts, totalContacts] = await Promise.all([
                ContactModel_1.ContactModel.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                ContactModel_1.ContactModel.countDocuments(filter),
            ]);
            const totalPages = Math.ceil(totalContacts / limit);
            res.status(200).json({
                success: true,
                data: {
                    contacts,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalContacts,
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
    // Get single contact by ID
    static async getContactById(req, res) {
        try {
            const { id } = req.params;
            const contact = await ContactModel_1.ContactModel.findById(id);
            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                success: true,
                data: contact,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Update contact status (for admin)
    static async updateContactStatus(req, res) {
        try {
            const { id } = req.params;
            const { status, isRead } = req.body;
            const updateData = {};
            if (status)
                updateData.status = status;
            if (isRead !== undefined)
                updateData.isRead = isRead;
            const updatedContact = await ContactModel_1.ContactModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            if (!updatedContact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Contact updated successfully',
                data: updatedContact,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Mark contact as read
    static async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const updatedContact = await ContactModel_1.ContactModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
            if (!updatedContact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Contact marked as read',
                data: updatedContact,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Delete contact (for admin)
    static async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const deletedContact = await ContactModel_1.ContactModel.findByIdAndDelete(id);
            if (!deletedContact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Contact deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get contact statistics (for dashboard)
    static async getContactStats(req, res) {
        try {
            const [totalContacts, newContacts, inProgressContacts, resolvedContacts, unreadContacts,] = await Promise.all([
                ContactModel_1.ContactModel.countDocuments(),
                ContactModel_1.ContactModel.countDocuments({ status: 'new' }),
                ContactModel_1.ContactModel.countDocuments({ status: 'in-progress' }),
                ContactModel_1.ContactModel.countDocuments({ status: 'resolved' }),
                ContactModel_1.ContactModel.countDocuments({ isRead: false }),
            ]);
            const stats = {
                total: totalContacts,
                byStatus: {
                    new: newContacts,
                    inProgress: inProgressContacts,
                    resolved: resolvedContacts,
                },
                unread: unreadContacts,
                readRate: totalContacts > 0
                    ? (((totalContacts - unreadContacts) / totalContacts) *
                        100).toFixed(2)
                    : 0,
            };
            res.status(200).json({
                success: true,
                data: stats,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get recent contacts (for dashboard)
    static async getRecentContacts(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const recentContacts = await ContactModel_1.ContactModel.find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .select('fullName email status isRead createdAt');
            res.status(200).json({
                success: true,
                data: recentContacts,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Bulk update contacts
    static async bulkUpdateContacts(req, res) {
        try {
            const { contactIds, status, isRead } = req.body;
            if (!contactIds ||
                !Array.isArray(contactIds) ||
                contactIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Contact IDs are required',
                });
            }
            const updateData = {};
            if (status)
                updateData.status = status;
            if (isRead !== undefined)
                updateData.isRead = isRead;
            const result = await ContactModel_1.ContactModel.updateMany({ _id: { $in: contactIds } }, updateData);
            res.status(200).json({
                success: true,
                message: `${result.modifiedCount} contacts updated successfully`,
                data: {
                    matchedCount: result.matchedCount,
                    modifiedCount: result.modifiedCount,
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
}
exports.ContactController = ContactController;
