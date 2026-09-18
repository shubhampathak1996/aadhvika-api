"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = require("../controllers/BlogController");
class BlogRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all blogs with pagination
        this.router.get('/', BlogController_1.BlogController.getBlogs);
        // Get blogs by category
        this.router.get('/category/:categoryId', BlogController_1.BlogController.getBlogsByCategory);
        // Get blog by slug
        this.router.get('/slug/:slug', BlogController_1.BlogController.getBlogBySlug);
        // Get blog by ID
        this.router.get('/:id', BlogController_1.BlogController.getBlogById);
        // Create a new blog
        this.router.post('/', BlogController_1.BlogController.createBlog);
        // Update a blog by ID
        this.router.put('/:id', BlogController_1.BlogController.updateBlog);
        // Delete a blog by ID
        this.router.delete('/:id', BlogController_1.BlogController.deleteBlog);
    }
}
exports.default = new BlogRoutes().router;
