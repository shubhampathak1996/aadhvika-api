"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
class CategoryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', CategoryController_1.CategoryController.getCategories);
        this.router.get('/slug/:slug', CategoryController_1.CategoryController.getCategoryBySlug);
        this.router.get('/:id', CategoryController_1.CategoryController.getCategoryById);
        this.router.post('/', CategoryController_1.CategoryController.createCategory);
        this.router.put('/:id', CategoryController_1.CategoryController.updateCategory);
        this.router.delete('/:id', CategoryController_1.CategoryController.deleteCategory);
    }
}
exports.default = new CategoryRoutes().router;
