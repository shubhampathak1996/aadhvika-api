"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServicesController_1 = require("../controllers/ServicesController");
class ServicesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Get all services with pagination and filters
        this.router.get('/', ServicesController_1.ServicesController.getServicesList);
        // Get published services only (public)
        this.router.get('/published', ServicesController_1.ServicesController.getPublishedServices);
        // Migration endpoint - add basePath to existing services (use GET for easy browser testing)
        this.router.get('/migrate-basepath', ServicesController_1.ServicesController.migrateBasePath);
        // Get service by slug (public)
        this.router.get('/slug/:slug', ServicesController_1.ServicesController.getServiceBySlug);
        // Get service by ID
        this.router.get('/id/:id', ServicesController_1.ServicesController.getServiceById);
        this.router.get('/:basePath/:slug', ServicesController_1.ServicesController.getServiceBasePath);
        // Create new service
        this.router.post('/', ServicesController_1.ServicesController.createService);
        // Update service
        this.router.put('/:id', ServicesController_1.ServicesController.updateService);
        // Delete service
        this.router.delete('/:id', ServicesController_1.ServicesController.deleteService);
    }
}
exports.default = new ServicesRoutes().router;
