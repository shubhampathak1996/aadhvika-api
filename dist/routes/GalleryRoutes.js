"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GalleryController_1 = require("../controllers/GalleryController");
class GalleryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all galleries (optionally with pagination)
        this.router.get('/', GalleryController_1.GalleryController.getGalleries);
        // Get gallery by ID
        this.router.get('/:id', GalleryController_1.GalleryController.getGalleryById);
        // Create a new gallery
        this.router.post('/', GalleryController_1.GalleryController.createGallery);
        // Update a gallery by ID
        this.router.put('/:id', GalleryController_1.GalleryController.updateGallery);
        // Delete a gallery by ID
        this.router.delete('/:id', GalleryController_1.GalleryController.deleteGallery);
    }
}
exports.default = new GalleryRoutes().router;
