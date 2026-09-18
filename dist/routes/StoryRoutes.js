"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoryController_1 = require("../controllers/StoryController");
class StoryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all stories sections with pagination
        this.router.get('/', StoryController_1.StoryController.getStoriesSections);
        // Get a single stories section by ID
        this.router.get('/:id', StoryController_1.StoryController.getStoriesSectionById);
        // Create a new stories section
        this.router.post('/', StoryController_1.StoryController.createStoriesSection);
        // Update a stories section by ID
        this.router.put('/:id', StoryController_1.StoryController.updateStoriesSection);
        // Delete a stories section by ID
        this.router.delete('/:id', StoryController_1.StoryController.deleteStoriesSection);
    }
}
exports.default = new StoryRoutes().router;
