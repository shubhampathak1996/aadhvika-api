"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SpotlightController_1 = require("../controllers/SpotlightController");
class SpotlightRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', SpotlightController_1.SpotlightController.getSpotlights);
        this.router.get('/:id', SpotlightController_1.SpotlightController.getSpotlightById);
        this.router.post('/', SpotlightController_1.SpotlightController.createSpotlight);
        this.router.put('/:id', SpotlightController_1.SpotlightController.updateSpotlight);
        this.router.delete('/:id', SpotlightController_1.SpotlightController.deleteSpotlight);
    }
}
exports.default = new SpotlightRoutes().router;
