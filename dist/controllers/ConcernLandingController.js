"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernLandingController = void 0;
const ConcernLandingModel_1 = __importDefault(require("../models/ConcernLandingModel"));
class ConcernLandingController {
    /**
     * GET /concern-landing
     * Public — returns the singleton doc (or null if not seeded yet).
     */
    static async getConcernLanding(_req, res) {
        try {
            const doc = await ConcernLandingModel_1.default.findOne({});
            res.status(200).json({ success: true, data: doc ?? null });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern landing',
                error: error.message,
            });
        }
    }
    /**
     * PUT /concern-landing
     * Admin — upsert: creates the singleton on first call, updates thereafter.
     */
    static async upsertConcernLanding(req, res) {
        try {
            const { heroSection, categories, skinSuiteSection, resultGallerySection, faqSection, } = req.body;
            const updatePayload = {};
            if (heroSection !== undefined)
                updatePayload.heroSection = heroSection;
            if (categories !== undefined)
                updatePayload.categories = categories;
            if (skinSuiteSection !== undefined)
                updatePayload.skinSuiteSection = skinSuiteSection;
            if (resultGallerySection !== undefined)
                updatePayload.resultGallerySection = resultGallerySection;
            if (faqSection !== undefined)
                updatePayload.faqSection = faqSection;
            const doc = await ConcernLandingModel_1.default.findOneAndUpdate({}, { $set: updatePayload }, { upsert: true, new: true, setDefaultsOnInsert: true });
            res.status(200).json({
                success: true,
                data: doc,
                message: 'Concern landing updated successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update concern landing',
                error: error.message,
            });
        }
    }
}
exports.ConcernLandingController = ConcernLandingController;
exports.default = ConcernLandingController;
