"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStoriesSectionSchema = exports.CreateStoriesSectionSchema = exports.StoriesDataSchema = exports.StoryItemSchema = void 0;
const zod_1 = require("zod");
exports.StoryItemSchema = zod_1.z.object({
    type: zod_1.z.enum(['video', 'before_after'], {
        message: 'Story type is required',
    }),
    title: zod_1.z.string().min(1, 'Title is required'),
    subtitle: zod_1.z.string().optional(),
    concern: zod_1.z.string().min(1, 'Concern is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    thumbnail: zod_1.z.string().optional(),
    video: zod_1.z.string().optional(),
    beforeImage: zod_1.z.string().optional(),
    afterImage: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
exports.StoriesDataSchema = zod_1.z.object({
    sectionTag: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required'),
    subHeading: zod_1.z.string().optional(),
    statsText: zod_1.z.string().optional(),
    buttonText: zod_1.z.string().optional(),
    buttonLink: zod_1.z.string().optional(),
    beforeAfterLabel: zod_1.z.string().optional(),
    beforeAfterHeading: zod_1.z.string().optional(),
    stories: zod_1.z
        .array(exports.StoryItemSchema)
        .min(1, 'At least one story item is required'),
});
exports.CreateStoriesSectionSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    enabled: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
    data: exports.StoriesDataSchema,
});
exports.UpdateStoriesSectionSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    enabled: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
    data: exports.StoriesDataSchema.optional(),
});
