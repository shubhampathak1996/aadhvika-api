import { z } from 'zod';

export const createCareerApplicationSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(2, 'Full name must be at least 2 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .trim()
      .toLowerCase(),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number is too long')
      .trim(),
    roleInterest: z
      .string({ required_error: 'Role interest is required' })
      .trim(),
    message: z.string().trim().optional(),
    consent: z.boolean({ required_error: 'Consent is required' }),
  }),
});

export const updateApplicationStatusSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Application ID is required' }),
  }),
  body: z.object({
    status: z.enum(['new', 'in-progress', 'resolved']).optional(),
    isRead: z.boolean().optional(),
  }),
});
