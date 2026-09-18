"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpdateContactsSchema = exports.contactIdSchema = exports.getContactsSchema = exports.updateContactStatusSchema = exports.createContactSchema = void 0;
const zod_1 = require("zod");
// Schema for creating contact
exports.createContactSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, 'Name is required')
            .max(100, 'Name must not exceed 100 characters')
            .trim(),
        phone: zod_1.z
            .string()
            .min(10, 'Phone number is required')
            .max(15, 'Phone number is too long')
            .trim()
            .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please provide a valid phone number'),
        email: zod_1.z.string().email('Invalid email address').toLowerCase().trim(),
        query: zod_1.z
            .string()
            .min(5, 'Query is required')
            .max(1000, 'Query must not exceed 1000 characters')
            .trim(),
    }),
});
// Schema for updating contact status (admin)
exports.updateContactStatusSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        status: zod_1.z.enum(['new', 'in-progress', 'resolved']).optional(),
        isRead: zod_1.z.boolean().optional(),
    })
        .refine((data) => data.status !== undefined || data.isRead !== undefined, {
        message: 'At least one field (status or isRead) must be provided',
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid contact ID format'),
    }),
});
// Schema for getting all contacts with filters
exports.getContactsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z
            .string()
            .regex(/^\d+$/, 'Page must be a positive number')
            .transform(Number)
            .refine((val) => val > 0, 'Page must be greater than 0')
            .optional(),
        limit: zod_1.z
            .string()
            .regex(/^\d+$/, 'Limit must be a positive number')
            .transform(Number)
            .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100')
            .optional(),
        status: zod_1.z.enum(['new', 'in-progress', 'resolved']).optional(),
        isRead: zod_1.z
            .string()
            .transform((val) => val === 'true')
            .optional(),
    }),
});
// Schema for contact ID parameter
exports.contactIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid contact ID format'),
    }),
});
// Schema for bulk update contacts
exports.bulkUpdateContactsSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        contactIds: zod_1.z
            .array(zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid contact ID format'))
            .min(1, 'At least one contact ID is required')
            .max(50, 'Cannot update more than 50 contacts at once'),
        status: zod_1.z.enum(['new', 'in-progress', 'resolved']).optional(),
        isRead: zod_1.z.boolean().optional(),
    })
        .refine((data) => data.status !== undefined || data.isRead !== undefined, {
        message: 'At least one field (status or isRead) must be provided',
    }),
});
