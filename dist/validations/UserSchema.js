"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userParamsSchema = exports.updateUserSchema = exports.createUserSchema = exports.userSchema = void 0;
const common_1 = require("../utils/common");
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters")
});
exports.createUserSchema = exports.userSchema;
exports.updateUserSchema = exports.userSchema.partial();
exports.userParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(common_1.objectIdRegex, "Invalid user ID format")
});
