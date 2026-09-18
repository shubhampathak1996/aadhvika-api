"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CareerController_1 = require("../controllers/CareerController");
const validateRequest_1 = require("../middlewares/validateRequest");
const CareerSchema_1 = require("../validations/CareerSchema");
const router = (0, express_1.Router)();
/**
 * @route POST /api/careers
 * @desc Submit a career application
 * @access Public
 */
router.post('/', (0, validateRequest_1.validateRequest)(CareerSchema_1.createCareerApplicationSchema), CareerController_1.CareerController.createCareerApplication);
/**
 * @route GET /api/careers
 * @desc Get all career applications
 * @access Private (Admin)
 */
router.get('/', CareerController_1.CareerController.getAllApplications);
/**
 * @route GET /api/careers/:id
 * @desc Get single career application by ID
 * @access Private (Admin)
 */
router.get('/:id', CareerController_1.CareerController.getApplicationById);
/**
 * @route PATCH /api/careers/:id/status
 * @desc Update application status (admin)
 * @access Private (Admin)
 */
router.patch('/:id/status', (0, validateRequest_1.validateRequest)(CareerSchema_1.updateApplicationStatusSchema), CareerController_1.CareerController.updateApplicationStatus);
/**
 * @route PATCH /api/careers/:id/read
 * @desc Mark application as read
 * @access Private (Admin)
 */
router.patch('/:id/read', CareerController_1.CareerController.markAsRead);
/**
 * @route DELETE /api/careers/:id
 * @desc Delete a career application
 * @access Private (Admin)
 */
router.delete('/:id', CareerController_1.CareerController.deleteApplication);
exports.default = router;
