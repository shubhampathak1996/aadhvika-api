"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = void 0;
const mongoose_1 = require("mongoose");
const MarqueeServiceSchema = new mongoose_1.Schema({
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
}, { _id: false });
const HeroSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['hero'], required: true, default: 'hero' },
    data: {
        backgroundImage: { type: String, required: true, trim: true },
        tag: {
            text: { type: String, trim: true },
        },
        heading: {
            title: { type: String, required: true, trim: true },
        },
        description: {
            text: { type: String, trim: true },
        },
        trust: {
            enabled: { type: Boolean },
            countText: { type: String, trim: true },
            label: { type: String, trim: true },
            avatars: [{ type: String, trim: true }],
        },
        marquee: {
            enabled: { type: Boolean },
            services: { type: [MarqueeServiceSchema], default: undefined },
        },
    },
}, {
    timestamps: true,
    id: false,
});
exports.HeroModel = (0, mongoose_1.model)('Hero', HeroSchema);
