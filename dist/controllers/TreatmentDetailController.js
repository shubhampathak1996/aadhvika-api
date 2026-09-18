"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentDetailController = void 0;
const TreatmentDetailModel_1 = __importDefault(require("../models/TreatmentDetailModel"));
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
class TreatmentDetailController {
    /** GET /treatment-details — paginated list with search + sort */
    static async getTreatmentDetails(req, res) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.max(1, parseInt(req.query.limit) || 10);
            const skip = (page - 1) * limit;
            const search = req.query.search || '';
            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            const filter = {};
            if (search) {
                const re = new RegExp(search, 'i');
                filter.$or = [{ slug: re }, { 'heroSection.title': re }];
            }
            const [items, total] = await Promise.all([
                TreatmentDetailModel_1.default.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .sort({ [sortBy]: sortOrder }),
                TreatmentDetailModel_1.default.countDocuments(filter),
            ]);
            res.status(200).json({
                success: true,
                data: items,
                total,
                page,
                pages: Math.ceil(total / limit),
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch treatment details',
                error: error.message,
            });
        }
    }
    /** POST /treatment-details — create */
    static async createTreatmentDetail(req, res) {
        try {
            const { slug, heroSection, treatmentDescriptionSection, peelSpectrumSection, howItWorksSection, whatToExpectSection, betterTogetherSection, concernsTackledSection, resultGallerySection, faqSection, seoSection, } = req.body;
            if (!slug) {
                return res
                    .status(400)
                    .json({ success: false, message: 'slug is required.' });
            }
            const normalizedSlug = String(slug).toLowerCase().trim();
            if (!SLUG_REGEX.test(normalizedSlug)) {
                return res.status(400).json({
                    success: false,
                    message: 'slug must match pattern: lowercase letters, numbers, and hyphens only (e.g. chemical-peels).',
                });
            }
            const doc = await TreatmentDetailModel_1.default.create({
                slug: normalizedSlug,
                heroSection,
                treatmentDescriptionSection,
                peelSpectrumSection,
                howItWorksSection,
                whatToExpectSection,
                betterTogetherSection,
                concernsTackledSection,
                resultGallerySection,
                faqSection,
                seoSection,
            });
            res.status(201).json({ success: true, data: doc });
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'A treatment detail with this slug already exists.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to create treatment detail',
                error: error.message,
            });
        }
    }
    /** GET /treatment-details/slug/:slug */
    static async getTreatmentDetailBySlug(req, res) {
        try {
            const { slug } = req.params;
            const doc = await TreatmentDetailModel_1.default.findOne({
                slug: slug.toLowerCase().trim(),
            });
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Treatment detail not found' });
            }
            res.status(200).json({ success: true, data: doc });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch treatment detail',
                error: error.message,
            });
        }
    }
    /** GET /treatment-details/:id */
    static async getTreatmentDetailById(req, res) {
        try {
            const { id } = req.params;
            const doc = await TreatmentDetailModel_1.default.findById(id);
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Treatment detail not found' });
            }
            res.status(200).json({ success: true, data: doc });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch treatment detail',
                error: error.message,
            });
        }
    }
    /** PUT /treatment-details/:id */
    static async updateTreatmentDetail(req, res) {
        try {
            const { id } = req.params;
            const { slug, heroSection, treatmentDescriptionSection, peelSpectrumSection, howItWorksSection, whatToExpectSection, betterTogetherSection, concernsTackledSection, resultGallerySection, faqSection, seoSection, } = req.body;
            const updateData = {};
            if (heroSection !== undefined)
                updateData.heroSection = heroSection;
            if (treatmentDescriptionSection !== undefined)
                updateData.treatmentDescriptionSection = treatmentDescriptionSection;
            if (peelSpectrumSection !== undefined)
                updateData.peelSpectrumSection = peelSpectrumSection;
            if (howItWorksSection !== undefined)
                updateData.howItWorksSection = howItWorksSection;
            if (whatToExpectSection !== undefined)
                updateData.whatToExpectSection = whatToExpectSection;
            if (betterTogetherSection !== undefined)
                updateData.betterTogetherSection = betterTogetherSection;
            if (concernsTackledSection !== undefined)
                updateData.concernsTackledSection = concernsTackledSection;
            if (resultGallerySection !== undefined)
                updateData.resultGallerySection = resultGallerySection;
            if (faqSection !== undefined)
                updateData.faqSection = faqSection;
            if (seoSection !== undefined)
                updateData.seoSection = seoSection;
            if (slug !== undefined) {
                const normalizedSlug = String(slug).toLowerCase().trim();
                if (!SLUG_REGEX.test(normalizedSlug)) {
                    return res.status(400).json({
                        success: false,
                        message: 'slug must match pattern: lowercase letters, numbers, and hyphens only.',
                    });
                }
                updateData.slug = normalizedSlug;
            }
            const doc = await TreatmentDetailModel_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Treatment detail not found' });
            }
            res.status(200).json({
                success: true,
                data: doc,
                message: 'Treatment detail updated successfully',
            });
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'A treatment detail with this slug already exists.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to update treatment detail',
                error: error.message,
            });
        }
    }
    /** DELETE /treatment-details/:id */
    static async deleteTreatmentDetail(req, res) {
        try {
            const { id } = req.params;
            const doc = await TreatmentDetailModel_1.default.findByIdAndDelete(id);
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Treatment detail not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Treatment detail deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete treatment detail',
                error: error.message,
            });
        }
    }
}
exports.TreatmentDetailController = TreatmentDetailController;
exports.default = TreatmentDetailController;
