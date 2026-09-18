"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                           APPOINTMENT SCHEMA                               */
/* -------------------------------------------------------------------------- */
const AppointmentSchema = new mongoose_1.Schema({
    badge: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    formTitle: {
        type: String,
        trim: true,
    },
    formDescription: {
        type: String,
        trim: true,
    },
    agreementText: {
        type: String,
        trim: true,
    },
    responseText: {
        type: String,
        trim: true,
    },
    buttonText: {
        type: String,
        trim: true,
    },
    contactTitle: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.AppointmentModel = mongoose_1.models.Appointment ||
    (0, mongoose_1.model)('Appointment', AppointmentSchema);
exports.default = exports.AppointmentModel;
