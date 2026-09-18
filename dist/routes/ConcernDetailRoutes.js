"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConcernDetailController_1 = require("../controllers/ConcernDetailController");
class ConcernDetailRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', ConcernDetailController_1.ConcernDetailController.getConcernDetails);
        this.router.get('/slug/:slug', ConcernDetailController_1.ConcernDetailController.getConcernDetailBySlug);
        this.router.get('/:id', ConcernDetailController_1.ConcernDetailController.getConcernDetailById);
        this.router.post('/', ConcernDetailController_1.ConcernDetailController.createConcernDetail);
        this.router.put('/:id', ConcernDetailController_1.ConcernDetailController.updateConcernDetail);
        this.router.delete('/:id', ConcernDetailController_1.ConcernDetailController.deleteConcernDetail);
    }
}
exports.default = new ConcernDetailRoutes().router;
