"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventsController_1 = require("../controllers/EventsController");
class EventsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        // Get all events (optionally with pagination)
        this.router.get('/', EventsController_1.EventsController.getEventsList);
        // Get event by ID
        this.router.get('/:id', EventsController_1.EventsController.getEventById);
        // Create a new event
        this.router.post('/', EventsController_1.EventsController.createEvent);
        // Update an event by ID
        this.router.put('/:id', EventsController_1.EventsController.updateEvent);
        // Delete an event by ID
        this.router.delete('/:id', EventsController_1.EventsController.deleteEvent);
    }
}
exports.default = new EventsRoutes().router;
