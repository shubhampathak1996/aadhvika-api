"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgetPasswordSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// Schema for user registration
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3)
        .max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/)
});
// Schema for user login
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
// Schema for refreshing access token
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string()
});
// Schema for forgetting password
exports.forgetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email()
});
// Schema for resetting password
exports.resetPasswordSchema = zod_1.z.object({
    resetToken: zod_1.z.string(),
    newPassword: zod_1.z.string().min(6)
});
