"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConcernController_1 = require("../controllers/ConcernController");
class ConcernRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all concern sections with pagination
        this.router.get('/', ConcernController_1.ConcernController.getConcernSections);
        // Get a single concern section by ID
        this.router.get('/:id', ConcernController_1.ConcernController.getConcernSectionById);
        // Create a new concern section
        this.router.post('/', ConcernController_1.ConcernController.createConcernSection);
        // Update a concern section by ID
        this.router.put('/:id', ConcernController_1.ConcernController.updateConcernSection);
        // Delete a concern section by ID
        this.router.delete('/:id', ConcernController_1.ConcernController.deleteConcernSection);
    }
}
exports.default = new ConcernRoutes().router;
