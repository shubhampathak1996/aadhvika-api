"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernPageModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                               SUB-SCHEMAS                                  */
/* -------------------------------------------------------------------------- */
const ConditionSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    badge: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
}, { _id: false });
const SectionSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    conditions: { type: [ConditionSchema], default: [] },
}, { _id: false });
const SkinSuiteItemSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, required: true },
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
    image: { type: String, required: true },
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
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
}, { _id: false });
const FaqSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [FaqItemSchema], default: [] },
}, { _id: false });
/* -------------------------------------------------------------------------- */
/*                            CONCERN PAGE SCHEMA                             */
/* -------------------------------------------------------------------------- */
const ConcernPageSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    heroImage: { type: String, required: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    sections: { type: [SectionSchema], default: [] },
    skinSuiteSection: { type: SkinSuiteSectionSchema },
    resultGallerySection: { type: ResultGallerySectionSchema },
    faqSection: { type: FaqSectionSchema },
}, { timestamps: true });
exports.ConcernPageModel = mongoose_1.models.ConcernPage ||
    (0, mongoose_1.model)('ConcernPage', ConcernPageSchema);
exports.default = exports.ConcernPageModel;
