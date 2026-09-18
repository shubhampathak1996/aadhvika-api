"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [10, 'Phone number must be at least 10 characters'],
        maxlength: [15, 'Phone number is too long'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    query: {
        type: String,
        required: [true, 'Query is required'],
        minlength: [5, 'Query must be at least 5 characters'],
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'resolved'],
        default: 'new',
    },
}, {
    timestamps: true,
});
exports.ContactModel = (0, mongoose_1.model)('Contact', ContactSchema);
