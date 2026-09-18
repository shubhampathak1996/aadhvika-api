"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BannerController_1 = require("../controllers/BannerController");
// import Auth from '../utils/AuthUser';
class BannerRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all banners with pagination
        this.router.get('/', BannerController_1.BannerController.getBanners);
        // Get a single banner by ID
        this.router.get('/:id', BannerController_1.BannerController.getBannerById);
        // Create a new banner
        this.router.post('/', 
        // Auth.authenticate, // Uncomment if authentication is needed
        BannerController_1.BannerController.createBanner);
        this.router.get('/:id', 
        // Auth.authenticate, // Uncomment if needed
        BannerController_1.BannerController.getBanner);
        // Update a banner by ID
        this.router.put('/:id', 
        // Auth.authenticate, // Uncomment if authentication is needed
        // Validation.validate(BannerSchema), // Uncomment if validation middleware is available
        BannerController_1.BannerController.updateBanner);
        // Delete a banner by ID
        this.router.delete('/:id', 
        // Auth.authenticate, // Uncomment if authentication is needed
        BannerController_1.BannerController.deleteBanner);
    }
}
exports.default = new BannerRoutes().router;
