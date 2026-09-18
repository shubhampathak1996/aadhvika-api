"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AboutController_1 = require("../controllers/AboutController");
// import Auth from '../utils/AuthUser';
class AboutRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all about sections with pagination
        this.router.get('/', AboutController_1.AboutController.getAbouts);
        // Get a single about section by custom id
        this.router.get('/:id', AboutController_1.AboutController.getAboutById);
        // Create a new about section
        this.router.post('/', 
        // Auth.authenticate,
        AboutController_1.AboutController.createAbout);
        // Update an about section by custom id
        this.router.put('/:id', 
        // Auth.authenticate,
        AboutController_1.AboutController.updateAbout);
        // Delete an about section by custom id
        this.router.delete('/:id', 
        // Auth.authenticate,
        AboutController_1.AboutController.deleteAbout);
    }
}
exports.default = new AboutRoutes().router;
