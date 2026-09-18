"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const zod_1 = require("zod");
exports.CategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters')
        .trim(),
    slug: zod_1.z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(100, 'Slug must be at most 100 characters')
        .trim()
        .toLowerCase(),
});
