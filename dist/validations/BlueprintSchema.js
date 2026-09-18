"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlueprintSectionSchema = exports.CreateBlueprintSectionSchema = exports.BlueprintStepSchema = void 0;
const zod_1 = require("zod");
exports.BlueprintStepSchema = zod_1.z.object({
    stepNumber: zod_1.z.coerce.number().min(1, 'Step number is required'),
    title: zod_1.z.string().min(1, 'Title is required'),
    subTitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    order: zod_1.z.coerce.number().optional(),
});
exports.CreateBlueprintSectionSchema = zod_1.z.object({
    badgeText: zod_1.z.string().optional(),
    heading: zod_1.z.string().min(1, 'Heading is required'),
    description: zod_1.z.string().optional(),
    steps: zod_1.z.array(exports.BlueprintStepSchema).min(1, 'At least one step is required'),
    isActive: zod_1.z.boolean().optional(),
});
exports.UpdateBlueprintSectionSchema = exports.CreateBlueprintSectionSchema.partial();
