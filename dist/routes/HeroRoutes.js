"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HeroController_1 = require("../controllers/HeroController");
// import Auth from '../utils/AuthUser';
class HeroRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all hero sections with pagination
        this.router.get('/', HeroController_1.HeroController.getHeroes);
        // Get a single hero section by custom id (e.g. "hero_1")
        this.router.get('/:id', HeroController_1.HeroController.getHeroById);
        // Create a new hero section
        this.router.post('/', 
        // Auth.authenticate,
        HeroController_1.HeroController.createHero);
        // Update a hero section by custom id
        this.router.put('/:id', 
        // Auth.authenticate,
        HeroController_1.HeroController.updateHero);
        // Delete a hero section by custom id
        this.router.delete('/:id', 
        // Auth.authenticate,
        HeroController_1.HeroController.deleteHero);
    }
}
exports.default = new HeroRoutes().router;
