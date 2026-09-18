"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintModel = void 0;
const mongoose_1 = require("mongoose");
const blueprintStepSchema = new mongoose_1.Schema({
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
}, { _id: false });
const blueprintSectionSchema = new mongoose_1.Schema({
    badgeText: { type: String, default: 'The Keynu Blueprint' },
    heading: { type: String, required: true },
    description: { type: String, default: '' },
    steps: [blueprintStepSchema],
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
exports.BlueprintModel = (0, mongoose_1.model)('BlueprintSection', blueprintSectionSchema);
