"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerSchema = void 0;
const zod_1 = require("zod");
exports.BannerSchema = zod_1.z.object({
    bannerImage: zod_1.z.string().url({ message: 'Banner image must be a valid URL' }),
    mobileBannerImage: zod_1.z
        .string()
        .url({ message: 'Mobile banner image must be a valid URL' }),
    link: zod_1.z.string().url({ message: 'Link must be a valid URL' }).optional(),
});
