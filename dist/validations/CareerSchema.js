"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatusSchema = exports.createCareerApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createCareerApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({ error: 'Full name is required' })
            .min(2, 'Full name must be at least 2 characters')
            .trim(),
        email: zod_1.z
            .string({ error: 'Email is required' })
            .email('Invalid email address')
            .trim()
            .toLowerCase(),
        phone: zod_1.z
            .string({ error: 'Phone number is required' })
            .min(10, 'Phone number must be at least 10 characters')
            .max(15, 'Phone number is too long')
            .trim(),
        roleInterest: zod_1.z
            .string({ error: 'Role interest is required' })
            .trim(),
        message: zod_1.z.string().trim().optional(),
        consent: zod_1.z.boolean({ error: 'Consent is required' }),
    }),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ error: 'Application ID is required' }),
    }),
    body: zod_1.z.object({
        status: zod_1.z.enum(['new', 'in-progress', 'resolved']).optional(),
        isRead: zod_1.z.boolean().optional(),
    }),
});
