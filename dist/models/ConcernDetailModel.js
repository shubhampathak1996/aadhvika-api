"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernDetailModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                               SUB-SCHEMAS                                  */
/* -------------------------------------------------------------------------- */
const HeroSectionSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    badge: { type: String, trim: true },
}, { _id: false });
const ProtocolItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    buttonText: { type: String, trim: true },
    buttonLink: { type: String, trim: true },
}, { _id: false });
const ProtocolSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [ProtocolItemSchema], default: [] },
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
const ConcernDetailSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    heroSection: { type: HeroSectionSchema },
    richContent: { type: String },
    protocolSection: { type: ProtocolSectionSchema },
    resultGallerySection: { type: ResultGallerySectionSchema },
    faqSection: { type: FaqSectionSchema },
    seoSection: { type: SeoSectionSchema },
}, { timestamps: true });
exports.ConcernDetailModel = mongoose_1.models.ConcernDetail ||
    (0, mongoose_1.model)('ConcernDetail', ConcernDetailSchema);
exports.default = exports.ConcernDetailModel;
