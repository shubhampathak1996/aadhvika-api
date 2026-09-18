"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcernDetailController = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const ConcernDetailModel_1 = __importDefault(require("../models/ConcernDetailModel"));
/* -------------------------------------------------------------------------- */
/*                           SANITIZE CONFIG                                  */
/* -------------------------------------------------------------------------- */
const SANITIZE_OPTIONS = {
    allowedTags: sanitize_html_1.default.defaults.allowedTags.concat([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'img',
        'iframe',
        'figure',
        'figcaption',
    ]),
    allowedAttributes: {
        ...sanitize_html_1.default.defaults.allowedAttributes,
        '*': ['class', 'style', 'id'],
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'width', 'height'],
        iframe: [
            'src',
            'width',
            'height',
            'frameborder',
            'allowfullscreen',
            'allow',
        ],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
};
function sanitize(html) {
    if (!html)
        return html;
    return (0, sanitize_html_1.default)(html, SANITIZE_OPTIONS);
}
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/* -------------------------------------------------------------------------- */
/*                              CONTROLLER                                    */
/* -------------------------------------------------------------------------- */
class ConcernDetailController {
    /** GET /concern-details — paginated list with search + sort */
    static async getConcernDetails(req, res) {
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
                ConcernDetailModel_1.default.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .sort({ [sortBy]: sortOrder }),
                ConcernDetailModel_1.default.countDocuments(filter),
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
                message: 'Failed to fetch concern details',
                error: error.message,
            });
        }
    }
    /** POST /concern-details — create */
    static async createConcernDetail(req, res) {
        try {
            const { slug, heroSection, richContent, protocolSection, resultGallerySection, faqSection, seoSection, } = req.body;
            if (!slug) {
                return res
                    .status(400)
                    .json({ success: false, message: 'slug is required.' });
            }
            const normalizedSlug = String(slug).toLowerCase().trim();
            if (!SLUG_REGEX.test(normalizedSlug)) {
                return res.status(400).json({
                    success: false,
                    message: 'slug must match pattern: lowercase letters, numbers, and hyphens only (e.g. acne-treatment).',
                });
            }
            const doc = await ConcernDetailModel_1.default.create({
                slug: normalizedSlug,
                heroSection,
                richContent: sanitize(richContent),
                protocolSection,
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
                    message: 'A concern detail with this slug already exists.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to create concern detail',
                error: error.message,
            });
        }
    }
    /** GET /concern-details/slug/:slug */
    static async getConcernDetailBySlug(req, res) {
        try {
            const { slug } = req.params;
            const doc = await ConcernDetailModel_1.default.findOne({
                slug: slug.toLowerCase().trim(),
            });
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern detail not found' });
            }
            res.status(200).json({ success: true, data: doc });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern detail',
                error: error.message,
            });
        }
    }
    /** GET /concern-details/:id */
    static async getConcernDetailById(req, res) {
        try {
            const { id } = req.params;
            const doc = await ConcernDetailModel_1.default.findById(id);
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern detail not found' });
            }
            res.status(200).json({ success: true, data: doc });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch concern detail',
                error: error.message,
            });
        }
    }
    /** PUT /concern-details/:id */
    static async updateConcernDetail(req, res) {
        try {
            const { id } = req.params;
            const { slug, heroSection, richContent, protocolSection, resultGallerySection, faqSection, seoSection, } = req.body;
            const updateData = {};
            if (heroSection !== undefined)
                updateData.heroSection = heroSection;
            if (richContent !== undefined)
                updateData.richContent = sanitize(richContent);
            if (protocolSection !== undefined)
                updateData.protocolSection = protocolSection;
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
            const doc = await ConcernDetailModel_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern detail not found' });
            }
            res.status(200).json({
                success: true,
                data: doc,
                message: 'Concern detail updated successfully',
            });
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'A concern detail with this slug already exists.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Failed to update concern detail',
                error: error.message,
            });
        }
    }
    /** DELETE /concern-details/:id */
    static async deleteConcernDetail(req, res) {
        try {
            const { id } = req.params;
            const doc = await ConcernDetailModel_1.default.findByIdAndDelete(id);
            if (!doc) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Concern detail not found' });
            }
            res.status(200).json({
                success: true,
                message: 'Concern detail deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete concern detail',
                error: error.message,
            });
        }
    }
}
exports.ConcernDetailController = ConcernDetailController;
exports.default = ConcernDetailController;
