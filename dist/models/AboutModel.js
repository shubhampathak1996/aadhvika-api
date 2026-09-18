"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModel = void 0;
const mongoose_1 = require("mongoose");
const AboutSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['about'], required: true, default: 'about' },
    data: {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
    },
}, {
    timestamps: true,
    id: false,
});
exports.AboutModel = (0, mongoose_1.model)('About', AboutSchema);
