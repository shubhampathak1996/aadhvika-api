import { Request, Response } from 'express';
import CategoryModel from '../models/CategoryModel';

export class CategoryController {
  static async getCategoryBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const category = await CategoryModel.findOne({ slug });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to fetch category', error: error.message });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { name, slug, description } = req.body;
      if (!name || !slug) {
        return res.status(400).json({ message: 'Name and slug are required.' });
      }
      const category = await CategoryModel.create({ name, slug, description });
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to create category', error: error.message });
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const [categories, total] = await Promise.all([
        CategoryModel.find().skip(skip).limit(limit),
        CategoryModel.countDocuments(),
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
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to fetch categories', error: error.message });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to fetch category', error: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, slug, description } = req.body;
      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { name, slug, description },
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to update category', error: error.message });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res
        .status(200)
        .json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Failed to delete category', error: error.message });
    }
  }
}
