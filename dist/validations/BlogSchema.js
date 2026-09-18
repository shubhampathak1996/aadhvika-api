"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogUpdateSchema = exports.BlogSchema = void 0;
const zod_1 = require("zod");
const FAQSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, 'FAQ question is required'),
    answer: zod_1.z.string().min(1, 'FAQ answer is required'),
});
const CommentSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    content: zod_1.z.string().min(1, 'Comment content is required'),
    approved: zod_1.z.boolean().optional(),
    createdAt: zod_1.z.date().optional(),
});
exports.BlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(200).trim(),
    description: zod_1.z.string().min(10).max(500).trim(),
    image: zod_1.z.string().min(1),
    altText: zod_1.z.string().optional(),
    content: zod_1.z.string().min(50),
    category: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(2).max(200).trim().toLowerCase(),
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string().min(1)).optional(),
    faqs: zod_1.z.array(FAQSchema).optional(),
    status: zod_1.z.enum(['draft', 'published', 'scheduled']).optional(),
    author: zod_1.z.string().min(1),
    comments: zod_1.z.array(CommentSchema).optional(),
    schemaMarkup: zod_1.z.string().optional(),
    ogTitle: zod_1.z.string().optional(),
    ogDescription: zod_1.z.string().optional(),
    ogImage: zod_1.z.string().optional(),
    twitterTitle: zod_1.z.string().optional(),
    twitterDescription: zod_1.z.string().optional(),
    twitterImage: zod_1.z.string().optional(),
    canonicalUrl: zod_1.z.string().optional(),
    publishedDate: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional(),
});
exports.BlogUpdateSchema = exports.BlogSchema.partial();
