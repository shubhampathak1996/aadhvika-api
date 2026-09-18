"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceSchema = exports.CreateServiceSchema = exports.ServiceFAQSchema = exports.ServiceFAQItemSchema = exports.ServiceImageSchema = exports.ServiceContentSchema = exports.ServiceContentSectionSchema = exports.ServiceTreatmentStageSchema = exports.ServicePointerSchema = void 0;
const zod_1 = require("zod");
const basePath_enum_1 = require("../enums/basePath.enum");
// Zod Schemas
exports.ServicePointerSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Pointer title is required'),
});
exports.ServiceTreatmentStageSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Treatment stage title is required'),
    description: zod_1.z.string().min(1, 'Treatment stage description is required'),
});
exports.ServiceContentSectionSchema = zod_1.z.object({
    image: zod_1.z.string().min(1, 'Section image is required'),
    title: zod_1.z.string().min(1, 'Section title is required'),
    description: zod_1.z.string().min(1, 'Section description is required'),
});
exports.ServiceContentSchema = zod_1.z.object({
    heading: zod_1.z.string().min(1, 'Content heading is required'),
    description: zod_1.z.string().min(1, 'Content description is required'),
    sections: zod_1.z
        .array(exports.ServiceContentSectionSchema)
        .min(1, 'At least one section is required'),
});
exports.ServiceImageSchema = zod_1.z.object({
    image: zod_1.z.string().min(1, 'Image URL is required'),
    title: zod_1.z.string().min(1, 'Image title is required'),
    description: zod_1.z.string().min(1, 'Image description is required'),
});
exports.ServiceFAQItemSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'FAQ question is required'),
    answer: zod_1.z.string().min(1, 'FAQ answer is required'),
});
exports.ServiceFAQSchema = zod_1.z.object({
    heading: zod_1.z.string().min(1, 'FAQ heading is required'),
    description: zod_1.z.string().min(1, 'FAQ description is required'),
    items: zod_1.z
        .array(exports.ServiceFAQItemSchema)
        .min(1, 'At least one FAQ item is required'),
});
exports.CreateServiceSchema = zod_1.z.object({
    basePath: zod_1.z.nativeEnum(basePath_enum_1.BasePathEnum),
    bannerTitle: zod_1.z.string().min(1, 'Banner title is required'),
    bannerDescription: zod_1.z.string().min(1, 'Banner description is required'),
    bannerImage: zod_1.z.string().min(1, 'Banner image is required'),
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    slug: zod_1.z.string().optional(),
    pointersTitle: zod_1.z.string().optional(),
    pointers: zod_1.z
        .array(exports.ServicePointerSchema)
        .min(1, 'At least one pointer is required'),
    treatmentStages: exports.ServiceTreatmentStageSchema,
    content: exports.ServiceContentSchema,
    images: zod_1.z.array(exports.ServiceImageSchema).optional().default([]),
    faq: exports.ServiceFAQSchema.optional(),
    status: zod_1.z
        .enum(['draft', 'published', 'archived'])
        .optional()
        .default('draft'),
});
exports.UpdateServiceSchema = exports.CreateServiceSchema.partial();
