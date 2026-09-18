"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSchema = void 0;
const zod_1 = require("zod");
exports.HeroSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, { message: 'id is required' }),
    type: zod_1.z.literal('hero'),
    data: zod_1.z.object({
        backgroundImage: zod_1.z
            .string()
            .min(1, { message: 'data.backgroundImage is required' }),
        tag: zod_1.z
            .object({
            text: zod_1.z.string().min(1, { message: 'tag.text is required' }),
        })
            .optional(),
        heading: zod_1.z.object({
            title: zod_1.z.string().min(1, { message: 'data.heading.title is required' }),
        }),
        description: zod_1.z
            .object({
            text: zod_1.z.string().min(1, { message: 'description.text is required' }),
        })
            .optional(),
        trust: zod_1.z
            .object({
            enabled: zod_1.z.boolean(),
            countText: zod_1.z.string().optional(),
            label: zod_1.z.string().optional(),
            avatars: zod_1.z.array(zod_1.z.string()).optional(),
        })
            .optional(),
        marquee: zod_1.z
            .object({
            enabled: zod_1.z.boolean(),
            services: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string().min(1, { message: 'service.id is required' }),
                title: zod_1.z.string().min(1, { message: 'service.title is required' }),
                image: zod_1.z.string().min(1, { message: 'service.image is required' }),
            })),
        })
            .optional(),
    }),
});
