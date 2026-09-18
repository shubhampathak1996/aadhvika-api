"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EnquiryController_1 = require("../controllers/EnquiryController");
class EnquiryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Public
        this.router.post('/', EnquiryController_1.EnquiryController.createEnquiry);
        // Admin
        this.router.get('/', EnquiryController_1.EnquiryController.getAllEnquiries);
        this.router.get('/:id', EnquiryController_1.EnquiryController.getEnquiryById);
        this.router.put('/:id', EnquiryController_1.EnquiryController.updateEnquiry);
        this.router.delete('/:id', EnquiryController_1.EnquiryController.deleteEnquiry);
    }
}
exports.default = new EnquiryRoutes().router;
