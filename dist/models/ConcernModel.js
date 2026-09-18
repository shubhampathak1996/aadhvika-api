"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernModel = void 0;
const mongoose_1 = require("mongoose");
const concernItemSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
}, { _id: false });
const concernSectionSchema = new mongoose_1.Schema({
    sectionTag: { type: String, default: 'Keynu Care' },
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    concerns: [concernItemSchema],
}, {
    timestamps: true,
});
exports.ConcernModel = (0, mongoose_1.model)('ConcernSection', concernSectionSchema);
