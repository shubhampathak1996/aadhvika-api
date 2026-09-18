"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlueprintController_1 = require("../controllers/BlueprintController");
class BlueprintRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all blueprint sections with pagination
        this.router.get('/', BlueprintController_1.BlueprintController.getBlueprintSections);
        // Get a single blueprint section by ID
        this.router.get('/:id', BlueprintController_1.BlueprintController.getBlueprintSectionById);
        // Create a new blueprint section
        this.router.post('/', BlueprintController_1.BlueprintController.createBlueprintSection);
        // Update a blueprint section by ID
        this.router.put('/:id', BlueprintController_1.BlueprintController.updateBlueprintSection);
        // Delete a blueprint section by ID
        this.router.delete('/:id', BlueprintController_1.BlueprintController.deleteBlueprintSection);
    }
}
exports.default = new BlueprintRoutes().router;
