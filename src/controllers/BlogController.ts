import { Request, Response } from 'express';
import { BlogModel } from '../models/BlogModel';

export class BlogController {
  static async createBlog(req: Request, res: Response) {
    try {
      const {
        title, description, image, altText, content, categories, slug,
        metaTitle, metaDescription, tags, faqs, status, author, comments,
        schemaMarkup, ogTitle, ogDescription, ogImage, twitterTitle,
        twitterDescription, twitterImage, canonicalUrl, publishedDate,
      } = req.body;

      if (!title || !description || !image || !content || !categories || !slug || !author) {
        return res.status(400).json({
          success: false,
          message: 'Required fields are missing',
        });
      }

      const blog = new BlogModel({
        title, description, image, altText, content, categories, slug,
        metaTitle, metaDescription, tags, faqs, status, author, comments,
        schemaMarkup, ogTitle, ogDescription, ogImage, twitterTitle,
        twitterDescription, twitterImage, canonicalUrl, publishedDate,
      });

      const savedBlog = await blog.save();
      res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: savedBlog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to create blog',
        error: error.message,
      });
    }
  }

  static async getBlogs(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [blogs, total] = await Promise.all([
        BlogModel.find()
          .populate('categories')
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        BlogModel.countDocuments(),
      ]);

      res.status(200).json({
        success: true,
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      console.error('Get blogs error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blogs',
        error: error.message,
      });
    }
  }

  static async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await BlogModel.findById(id).populate('categories');

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.status(200).json({ success: true, data: blog });
    } catch (error: any) {
      console.error('Get blog by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog',
        error: error.message,
      });
    }
  }

  static async getBlogBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const blog = await BlogModel.findOne({ slug }).populate('categories');

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.status(200).json({ success: true, data: blog });
    } catch (error: any) {
      console.error('Get blog by slug error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog',
        error: error.message,
      });
    }
  }

  static async getBlogsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [blogs, total] = await Promise.all([
        BlogModel.find({ categories: categoryId })
          .populate('categories')
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        BlogModel.countDocuments({ categories: categoryId }),
      ]);

      res.status(200).json({
        success: true,
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      console.error('Get blogs by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blogs by category',
        error: error.message,
      });
    }
  }

  static async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateFields = { ...req.body };

      const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      }).populate('categories');

      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to update blog',
        error: error.message,
      });
    }
  }

  static async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await BlogModel.findByIdAndDelete(id);

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error: any) {
      console.error('Delete blog error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete blog',
        error: error.message,
      });
    }
  }
}
