"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutSchema = void 0;
const zod_1 = require("zod");
exports.AboutSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: 'id is required' }),
    type: zod_1.z.literal('about'),
    data: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: 'data.title is required' }),
        description: zod_1.z.string().min(1, { message: 'data.description is required' }),
    }),
});
