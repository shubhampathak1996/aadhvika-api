"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppointmentController_1 = require("../controllers/AppointmentController");
class AppointmentRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', AppointmentController_1.AppointmentController.getAppointments);
        this.router.get('/:id', AppointmentController_1.AppointmentController.getAppointmentById);
        this.router.post('/', AppointmentController_1.AppointmentController.createAppointment);
        this.router.put('/:id', AppointmentController_1.AppointmentController.updateAppointment);
        this.router.delete('/:id', AppointmentController_1.AppointmentController.deleteAppointment);
    }
}
exports.default = new AppointmentRoutes().router;
