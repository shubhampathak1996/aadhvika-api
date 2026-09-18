"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConcernSectionSchema = exports.CreateConcernSectionSchema = exports.ConcernItemSchema = void 0;
const zod_1 = require("zod");
exports.ConcernItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
exports.CreateConcernSectionSchema = zod_1.z.object({
    sectionTag: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required'),
    subHeading: zod_1.z.string().min(1, 'Sub heading is required'),
    concerns: zod_1.z
        .array(exports.ConcernItemSchema)
        .min(1, 'At least one concern item is required'),
});
exports.UpdateConcernSectionSchema = zod_1.z.object({
    sectionTag: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required').optional(),
    subHeading: zod_1.z.string().min(1, 'Sub heading is required').optional(),
    concerns: zod_1.z.array(exports.ConcernItemSchema).optional(),
});
