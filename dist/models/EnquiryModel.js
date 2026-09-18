"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiryModel = void 0;
const mongoose_1 = require("mongoose");
const EnquirySchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [2, 'Full name must be at least 2 characters'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [7, 'Phone number must be at least 7 digits'],
        maxlength: [20, 'Phone number is too long'],
        trim: true,
    },
    service: {
        type: String,
        required: [true, 'Service is required'],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    brief: {
        type: String,
        trim: true,
        maxlength: [1000, 'Brief cannot exceed 1000 characters'],
    },
    consent: {
        type: Boolean,
        required: [true, 'Consent is required'],
        validate: {
            validator: (v) => v === true,
            message: 'You must agree to continue',
        },
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
}, { timestamps: true });
exports.EnquiryModel = mongoose_1.models.Enquiry ||
    (0, mongoose_1.model)('Enquiry', EnquirySchema);
exports.default = exports.EnquiryModel;
