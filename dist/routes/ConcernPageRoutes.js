"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConcernPageController_1 = require("../controllers/ConcernPageController");
class ConcernPageRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', ConcernPageController_1.ConcernPageController.getConcernPages);
        this.router.get('/:id', ConcernPageController_1.ConcernPageController.getConcernPageById);
        this.router.post('/', ConcernPageController_1.ConcernPageController.createConcernPage);
        this.router.put('/:id', ConcernPageController_1.ConcernPageController.updateConcernPage);
        this.router.delete('/:id', ConcernPageController_1.ConcernPageController.deleteConcernPage);
    }
}
exports.default = new ConcernPageRoutes().router;
