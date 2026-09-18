"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFounderSectionSchema = exports.CreateFounderSectionSchema = void 0;
const zod_1 = require("zod");
exports.CreateFounderSectionSchema = zod_1.z.object({
    badgeText: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required'),
    quote: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    founderName: zod_1.z.string().optional(),
    founderRole: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    buttonText: zod_1.z.string().optional(),
    buttonLink: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.UpdateFounderSectionSchema = exports.CreateFounderSectionSchema.partial();
