"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentLandingModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                               SUB-SCHEMAS                                  */
/* -------------------------------------------------------------------------- */
const HeroSectionSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
}, { _id: false });
const CategoryItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const CategorySchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [CategoryItemSchema], default: [] },
}, { _id: false });
const FaqItemSchema = new mongoose_1.Schema({
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
}, { _id: false });
const FaqSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [FaqItemSchema], default: [] },
}, { _id: false });
const SeoSectionSchema = new mongoose_1.Schema({
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    keywords: { type: [String], default: [] },
}, { _id: false });
/* -------------------------------------------------------------------------- */
/*                                MAIN SCHEMA                                 */
/* -------------------------------------------------------------------------- */
const TreatmentLandingSchema = new mongoose_1.Schema({
    heroSection: { type: HeroSectionSchema },
    categories: { type: [CategorySchema], default: [] },
    faqSection: { type: FaqSectionSchema },
    seoSection: { type: SeoSectionSchema },
}, { timestamps: true });
exports.TreatmentLandingModel = mongoose_1.models.TreatmentLanding ||
    (0, mongoose_1.model)('TreatmentLanding', TreatmentLandingSchema);
exports.default = exports.TreatmentLandingModel;
