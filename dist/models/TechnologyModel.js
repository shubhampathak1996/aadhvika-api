"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyModel = void 0;
const mongoose_1 = require("mongoose");
const technologyItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    badgeText: { type: String, default: 'FDA' },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { _id: false });
const technologySectionSchema = new mongoose_1.Schema({
    type: { type: String, default: 'technology_section' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    data: {
        sectionTag: { type: String, default: 'Beauty by precision' },
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
        technologies: [technologyItemSchema],
    },
}, {
    timestamps: true,
});
exports.TechnologyModel = (0, mongoose_1.model)('TechnologySection', technologySectionSchema);
