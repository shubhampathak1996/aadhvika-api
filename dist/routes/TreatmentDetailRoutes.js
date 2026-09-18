"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TreatmentDetailController_1 = require("../controllers/TreatmentDetailController");
class TreatmentDetailRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', TreatmentDetailController_1.TreatmentDetailController.getTreatmentDetails);
        this.router.get('/slug/:slug', TreatmentDetailController_1.TreatmentDetailController.getTreatmentDetailBySlug);
        this.router.get('/:id', TreatmentDetailController_1.TreatmentDetailController.getTreatmentDetailById);
        this.router.post('/', TreatmentDetailController_1.TreatmentDetailController.createTreatmentDetail);
        this.router.put('/:id', TreatmentDetailController_1.TreatmentDetailController.updateTreatmentDetail);
        this.router.delete('/:id', TreatmentDetailController_1.TreatmentDetailController.deleteTreatmentDetail);
    }
}
exports.default = new TreatmentDetailRoutes().router;
