"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsUpdateSchema = exports.NewsSchema = void 0;
const zod_1 = require("zod");
exports.NewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    slug: zod_1.z.string().min(1, 'Slug is required'),
});
exports.NewsUpdateSchema = exports.NewsSchema.partial();
