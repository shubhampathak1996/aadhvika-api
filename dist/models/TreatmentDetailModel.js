"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentDetailModel = void 0;
const mongoose_1 = require("mongoose");
/* -------------------------------------------------------------------------- */
/*                               SUB-SCHEMAS                                  */
/* -------------------------------------------------------------------------- */
const HeroSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    imageDescription: { type: String, trim: true },
}, { _id: false });
const TreatmentDescriptionSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    longDescription: { type: String, trim: true },
    image: { type: String, trim: true },
}, { _id: false });
const PeelSpectrumItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
}, { _id: false });
const PeelSpectrumSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [PeelSpectrumItemSchema], default: [] },
}, { _id: false });
const HowItWorksItemSchema = new mongoose_1.Schema({
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
}, { _id: false });
const HowItWorksSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [HowItWorksItemSchema], default: [] },
}, { _id: false });
const WhatToExpectItemSchema = new mongoose_1.Schema({
    heading: { type: String, trim: true },
    description: { type: String, trim: true },
}, { _id: false });
const WhatToExpectSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [WhatToExpectItemSchema], default: [] },
}, { _id: false });
const BetterTogetherItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const BetterTogetherSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [BetterTogetherItemSchema], default: [] },
}, { _id: false });
const ConcernsTackledItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { _id: false });
const ConcernsTackledSectionSchema = new mongoose_1.Schema({
    badge: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    items: { type: [ConcernsTackledItemSchema], default: [] },
}, { _id: false });
const GalleryItemSchema = new mongoose_1.Schema({
    title: { type: String, trim: true },
    beforeImage: { type: String, trim: true },
    afterImage: { type: String, trim: true },
    caption: { type: String, trim: true },
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
const TreatmentDetailSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    heroSection: { type: HeroSectionSchema },
    treatmentDescriptionSection: { type: TreatmentDescriptionSectionSchema },
    peelSpectrumSection: { type: PeelSpectrumSectionSchema },
    howItWorksSection: { type: HowItWorksSectionSchema },
    whatToExpectSection: { type: WhatToExpectSectionSchema },
    betterTogetherSection: { type: BetterTogetherSectionSchema },
    concernsTackledSection: { type: ConcernsTackledSectionSchema },
    resultGallerySection: { type: ResultGallerySectionSchema },
    faqSection: { type: FaqSectionSchema },
    seoSection: { type: SeoSectionSchema },
}, { timestamps: true });
exports.TreatmentDetailModel = mongoose_1.models.TreatmentDetail ||
    (0, mongoose_1.model)('TreatmentDetail', TreatmentDetailSchema);
exports.default = exports.TreatmentDetailModel;
