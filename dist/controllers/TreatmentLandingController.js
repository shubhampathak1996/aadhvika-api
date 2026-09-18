"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentLandingController = void 0;
const TreatmentLandingModel_1 = __importDefault(require("../models/TreatmentLandingModel"));
class TreatmentLandingController {
    /**
     * GET /treatment-landing
     * Public — returns the singleton doc (or null if not seeded yet).
     */
    static async getTreatmentLanding(_req, res) {
        try {
            const doc = await TreatmentLandingModel_1.default.findOne({});
            res.status(200).json({ success: true, data: doc ?? null });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch treatment landing',
                error: error.message,
            });
        }
    }
    /**
     * PUT /treatment-landing
     * Admin — upsert: creates the singleton on first call, updates thereafter.
     */
    static async upsertTreatmentLanding(req, res) {
        try {
            const { heroSection, categories, faqSection, seoSection } = req.body;
            const updatePayload = {};
            if (heroSection !== undefined)
                updatePayload.heroSection = heroSection;
            if (categories !== undefined)
                updatePayload.categories = categories;
            if (faqSection !== undefined)
                updatePayload.faqSection = faqSection;
            if (seoSection !== undefined)
                updatePayload.seoSection = seoSection;
            const doc = await TreatmentLandingModel_1.default.findOneAndUpdate({}, { $set: updatePayload }, { upsert: true, new: true, setDefaultsOnInsert: true });
            res.status(200).json({
                success: true,
                data: doc,
                message: 'Treatment landing updated successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update treatment landing',
                error: error.message,
            });
        }
    }
}
exports.TreatmentLandingController = TreatmentLandingController;
exports.default = TreatmentLandingController;
