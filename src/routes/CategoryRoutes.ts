import express from 'express';
import { CategoryController } from '../controllers/CategoryController';

class CategoryRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/', CategoryController.getCategories);
    this.router.get('/slug/:slug', CategoryController.getCategoryBySlug);
    this.router.get('/:id', CategoryController.getCategoryById);
    this.router.post('/', CategoryController.createCategory);
    this.router.put('/:id', CategoryController.updateCategory);
    this.router.delete('/:id', CategoryController.deleteCategory);
  }
}

export default new CategoryRoutes().router;
