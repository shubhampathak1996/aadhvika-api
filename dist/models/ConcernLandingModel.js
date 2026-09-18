"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernLandingModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                               SUB-SCHEMAS                                  */
/* -------------------------------------------------------------------------- */
const CategoryItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    badge: { type: String, trim: true },
    description: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const CategorySchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [CategoryItemSchema], default: [] },
}, { _id: false });
const SkinSuiteItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const SkinSuiteSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [SkinSuiteItemSchema], default: [] },
}, { _id: false });
const GalleryItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    image: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const ResultGallerySectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    buttonText: { type: String, trim: true },
    buttonLink: { type: String, trim: true },
    items: { type: [GalleryItemSchema], default: [] },
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
    contactTitle: { type: String, trim: true },
    contactDescription: { type: String, trim: true },
    contactButtonText: { type: String, trim: true },
    contactButtonLink: { type: String, trim: true },
}, { _id: false });
const HeroSectionSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
}, { _id: false });
/* -------------------------------------------------------------------------- */
/*                                MAIN SCHEMA                                 */
/* -------------------------------------------------------------------------- */
const ConcernLandingSchema = new mongoose_1.Schema({
    heroSection: { type: HeroSectionSchema },
    categories: { type: [CategorySchema], default: [] },
    skinSuiteSection: { type: SkinSuiteSectionSchema },
    resultGallerySection: { type: ResultGallerySectionSchema },
    faqSection: { type: FaqSectionSchema },
}, { timestamps: true });
exports.ConcernLandingModel = mongoose_1.models.ConcernLanding ||
    (0, mongoose_1.model)('ConcernLanding', ConcernLandingSchema);
exports.default = exports.ConcernLandingModel;
