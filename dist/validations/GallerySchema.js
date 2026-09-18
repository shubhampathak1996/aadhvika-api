"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryUpdateSchema = exports.GallerySchema = exports.GalleryImageSchema = void 0;
const zod_1 = require("zod");
exports.GalleryImageSchema = zod_1.z.object({
    url: zod_1.z.string().min(1, 'Image URL is required'),
    caption: zod_1.z.string().optional(),
});
exports.GallerySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    images: zod_1.z.array(exports.GalleryImageSchema).min(1, 'At least one image is required'),
    type: zod_1.z.enum(['gallery', 'before_after']),
});
exports.GalleryUpdateSchema = exports.GallerySchema.partial();
