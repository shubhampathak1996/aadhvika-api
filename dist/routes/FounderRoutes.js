"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FounderController_1 = require("../controllers/FounderController");
class FounderRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all founder sections with pagination
        this.router.get('/', FounderController_1.FounderController.getFounderSections);
        // Get a single founder section by ID
        this.router.get('/:id', FounderController_1.FounderController.getFounderSectionById);
        // Create a new founder section
        this.router.post('/', FounderController_1.FounderController.createFounderSection);
        // Update a founder section by ID
        this.router.put('/:id', FounderController_1.FounderController.updateFounderSection);
        // Delete a founder section by ID
        this.router.delete('/:id', FounderController_1.FounderController.deleteFounderSection);
    }
}
exports.default = new FounderRoutes().router;
