"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConcernLandingController_1 = require("../controllers/ConcernLandingController");
class ConcernLandingRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', ConcernLandingController_1.ConcernLandingController.getConcernLanding);
        this.router.put('/', ConcernLandingController_1.ConcernLandingController.upsertConcernLanding);
    }
}
exports.default = new ConcernLandingRoutes().router;
