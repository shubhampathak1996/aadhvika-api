import express from 'express';
import { BlogController } from '../controllers/BlogController';

class BlogRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all blogs with pagination
    this.router.get('/', BlogController.getBlogs);
    // Get blogs by category
    this.router.get('/category/:categoryId', BlogController.getBlogsByCategory);
    // Get blog by slug
    this.router.get('/slug/:slug', BlogController.getBlogBySlug);
    // Get blog by ID
    this.router.get('/:id', BlogController.getBlogById);
    // Create a new blog
    this.router.post('/', BlogController.createBlog);
    // Update a blog by ID
    this.router.put('/:id', BlogController.updateBlog);
    // Delete a blog by ID
    this.router.delete('/:id', BlogController.deleteBlog);
  }
}

export default new BlogRoutes().router;
