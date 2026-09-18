"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryModel = void 0;
const mongoose_1 = require("mongoose");
const storyItemSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['video', 'before_after'], required: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    concern: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: '' },
    video: { type: String, default: '' },
    beforeImage: { type: String, default: '' },
    afterImage: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { _id: true });
const storiesSectionSchema = new mongoose_1.Schema({
    type: { type: String, default: 'stories_section' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    data: {
        sectionTag: { type: String, default: 'Keynu Stories' },
        heading: { type: String, required: true },
        subHeading: { type: String, default: '' },
        statsText: { type: String, default: '' },
        buttonText: { type: String, default: 'View all Stories' },
        buttonLink: { type: String, default: '/stories' },
        beforeAfterLabel: { type: String, default: 'BeforeAfter' },
        beforeAfterHeading: {
            type: String,
            default: 'Real results, real patients',
        },
        stories: [storyItemSchema],
    },
}, {
    timestamps: true,
});
exports.StoryModel = (0, mongoose_1.model)('StoriesSection', storiesSectionSchema);
