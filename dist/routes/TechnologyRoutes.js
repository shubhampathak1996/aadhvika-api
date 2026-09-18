"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TechnologyController_1 = require("../controllers/TechnologyController");
class TechnologyRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all technology sections with pagination
        this.router.get('/', TechnologyController_1.TechnologyController.getTechnologySections);
        // Get a single technology section by ID
        this.router.get('/:id', TechnologyController_1.TechnologyController.getTechnologySectionById);
        // Create a new technology section
        this.router.post('/', TechnologyController_1.TechnologyController.createTechnologySection);
        // Update a technology section by ID
        this.router.put('/:id', TechnologyController_1.TechnologyController.updateTechnologySection);
        // Delete a technology section by ID
        this.router.delete('/:id', TechnologyController_1.TechnologyController.deleteTechnologySection);
    }
}
exports.default = new TechnologyRoutes().router;
