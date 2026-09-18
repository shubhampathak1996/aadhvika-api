"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventSchema = exports.CreateEventSchema = void 0;
const zod_1 = require("zod");
exports.CreateEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    slug: zod_1.z.string().optional(),
    publishedDate: zod_1.z.string().or(zod_1.z.date()).optional(),
});
exports.UpdateEventSchema = exports.CreateEventSchema.partial();
