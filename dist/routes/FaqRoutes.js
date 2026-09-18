"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FaqController_1 = require("../controllers/FaqController");
class FaqRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', FaqController_1.FaqController.getFaqs);
        this.router.get('/:id', FaqController_1.FaqController.getFaqById);
        this.router.post('/', FaqController_1.FaqController.createFaq);
        this.router.put('/:id', FaqController_1.FaqController.updateFaq);
        this.router.delete('/:id', FaqController_1.FaqController.deleteFaq);
    }
}
exports.default = new FaqRoutes().router;
