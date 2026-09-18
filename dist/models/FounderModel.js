"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderModel = void 0;
const mongoose_1 = require("mongoose");
const founderSectionSchema = new mongoose_1.Schema({
    badgeText: { type: String, default: 'From our founder' },
    heading: { type: String, required: true },
    quote: { type: String, default: '' },
    description: { type: String, default: '' },
    founderName: { type: String, default: '' },
    founderRole: { type: String, default: '' },
    image: { type: String, default: '' },
    buttonText: { type: String, default: 'Read the full Story' },
    buttonLink: { type: String, default: '/about' },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
exports.FounderModel = (0, mongoose_1.model)('FounderSection', founderSectionSchema);
