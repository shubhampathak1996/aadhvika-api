"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBookingModel = void 0;
const mongoose_1 = require("mongoose");
const AppointmentBookingSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [2, 'Full name must be at least 2 characters'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [10, 'Phone number must be at least 10 digits'],
        maxlength: [15, 'Phone number is too long'],
        trim: true,
    },
    enquiryFor: {
        type: String,
        required: [true, 'Enquiry type is required'],
        enum: {
            values: ['skin', 'hair', 'body', 'face'],
            message: 'Invalid enquiry type',
        },
        trim: true,
    },
    comments: {
        type: String,
        trim: true,
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
exports.AppointmentBookingModel = mongoose_1.models.AppointmentBooking ||
    (0, mongoose_1.model)('AppointmentBooking', AppointmentBookingSchema);
exports.default = exports.AppointmentBookingModel;
