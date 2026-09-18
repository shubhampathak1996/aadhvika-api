"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TreatmentLandingController_1 = require("../controllers/TreatmentLandingController");
class TreatmentLandingRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', TreatmentLandingController_1.TreatmentLandingController.getTreatmentLanding);
        this.router.put('/', TreatmentLandingController_1.TreatmentLandingController.upsertTreatmentLanding);
    }
}
exports.default = new TreatmentLandingRoutes().router;
