import { Router } from 'express';
import { CareerController } from '../controllers/CareerController';
import { validateRequest } from '../middlewares/validateRequest';
import {
  createCareerApplicationSchema,
  updateApplicationStatusSchema,
} from '../validations/CareerSchema';

const router = Router();

/**
 * @route POST /api/careers
 * @desc Submit a career application
 * @access Public
 */
router.post(
  '/',
  validateRequest(createCareerApplicationSchema),
  CareerController.createCareerApplication,
);

/**
 * @route GET /api/careers
 * @desc Get all career applications
 * @access Private (Admin)
 */
router.get('/', CareerController.getAllApplications);

/**
 * @route GET /api/careers/:id
 * @desc Get single career application by ID
 * @access Private (Admin)
 */
router.get('/:id', CareerController.getApplicationById);

/**
 * @route PATCH /api/careers/:id/status
 * @desc Update application status (admin)
 * @access Private (Admin)
 */
router.patch(
  '/:id/status',
  validateRequest(updateApplicationStatusSchema),
  CareerController.updateApplicationStatus,
);

/**
 * @route PATCH /api/careers/:id/read
 * @desc Mark application as read
 * @access Private (Admin)
 */
router.patch('/:id/read', CareerController.markAsRead);

/**
 * @route DELETE /api/careers/:id
 * @desc Delete a career application
 * @access Private (Admin)
 */
router.delete('/:id', CareerController.deleteApplication);

export default router;
