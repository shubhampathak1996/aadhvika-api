"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
class CategoryController {
    static async getCategoryBySlug(req, res) {
        try {
            const { slug } = req.params;
            const category = await CategoryModel_1.default.findOne({ slug });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ success: true, data: category });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to fetch category', error: error.message });
        }
    }
    static async createCategory(req, res) {
        try {
            const { name, slug, description } = req.body;
            if (!name || !slug) {
                return res.status(400).json({ message: 'Name and slug are required.' });
            }
            const category = await CategoryModel_1.default.create({ name, slug, description });
            res.status(201).json({ success: true, data: category });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to create category', error: error.message });
        }
    }
    static async getCategories(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const [categories, total] = await Promise.all([
                CategoryModel_1.default.find().skip(skip).limit(limit),
                CategoryModel_1.default.countDocuments(),
            ]);
            res.status(200).json({
                success: true,
                data: categories,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to fetch categories', error: error.message });
        }
    }
    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel_1.default.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ success: true, data: category });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to fetch category', error: error.message });
        }
    }
    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name, slug, description } = req.body;
            const category = await CategoryModel_1.default.findByIdAndUpdate(id, { name, slug, description }, { new: true, runValidators: true });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ success: true, data: category });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to update category', error: error.message });
        }
    }
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel_1.default.findByIdAndDelete(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res
                .status(200)
                .json({ success: true, message: 'Category deleted successfully' });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Failed to delete category', error: error.message });
        }
    }
}
exports.CategoryController = CategoryController;
