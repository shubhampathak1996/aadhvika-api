"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTechnologySectionSchema = exports.CreateTechnologySectionSchema = exports.TechnologyDataSchema = exports.TechnologyItemSchema = void 0;
const zod_1 = require("zod");
exports.TechnologyItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    badgeText: zod_1.z.string().optional(),
    slug: zod_1.z.string().min(1, 'Slug is required'),
    isActive: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
});
exports.TechnologyDataSchema = zod_1.z.object({
    sectionTag: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required'),
    subHeading: zod_1.z.string().min(1, 'Sub heading is required'),
    technologies: zod_1.z
        .array(exports.TechnologyItemSchema)
        .min(1, 'At least one technology item is required'),
});
exports.CreateTechnologySectionSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    enabled: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
    data: exports.TechnologyDataSchema,
});
exports.UpdateTechnologySectionSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    enabled: zod_1.z.boolean().optional(),
    order: zod_1.z.number().optional(),
    data: exports.TechnologyDataSchema.optional(),
});
