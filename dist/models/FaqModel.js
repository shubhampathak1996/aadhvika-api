"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                              FAQ ITEM SCHEMA                               */
/* -------------------------------------------------------------------------- */
const FaqItemSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });
/* -------------------------------------------------------------------------- */
/*                              FAQ SCHEMA                                    */
/* -------------------------------------------------------------------------- */
const FaqSchema = new mongoose_1.Schema({
    badge: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    contactTitle: {
        type: String,
        trim: true,
    },
    contactDescription: {
        type: String,
        trim: true,
    },
    buttonText: {
        type: String,
        trim: true,
    },
    buttonLink: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    faqs: {
        type: [FaqItemSchema],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: 'At least one FAQ item is required',
        },
    },
}, { timestamps: true });
exports.FaqModel = mongoose_1.models.Faq || (0, mongoose_1.model)('Faq', FaqSchema);
exports.default = exports.FaqModel;
