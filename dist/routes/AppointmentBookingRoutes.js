"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppointmentBookingController_1 = require("../controllers/AppointmentBookingController");
class AppointmentBookingRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Public
        this.router.post('/', AppointmentBookingController_1.AppointmentBookingController.createBooking);
        // Admin
        this.router.get('/', AppointmentBookingController_1.AppointmentBookingController.getAllBookings);
        this.router.get('/:id', AppointmentBookingController_1.AppointmentBookingController.getBookingById);
        this.router.put('/:id', AppointmentBookingController_1.AppointmentBookingController.updateBooking);
        this.router.delete('/:id', AppointmentBookingController_1.AppointmentBookingController.deleteBooking);
    }
}
exports.default = new AppointmentBookingRoutes().router;
