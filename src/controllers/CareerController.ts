import { Request, Response } from 'express';
import { CareerModel } from '../models/CareerModel';

export class CareerController {
  // Create a new career application
  static async createCareerApplication(req: Request, res: Response) {
    try {
      const { fullName, email, phone, roleInterest, message, consent } =
        req.body;

      if (
        !fullName ||
        !email ||
        !phone ||
        !roleInterest ||
        consent === undefined
      ) {
        return res.status(400).json({
          success: false,
          message: 'All required fields must be provided',
        });
      }

      const newApplication = new CareerModel({
        fullName,
        email,
        phone,
        roleInterest,
        message,
        consent,
      });

      const savedApplication = await newApplication.save();

      res.status(201).json({
        success: true,
        message: 'Career application submitted successfully',
        data: savedApplication,
      });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit career application',
      });
    }
  }

  // Get all career applications (for admin)
  static async getAllApplications(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const isRead = req.query.isRead as string;
      const roleInterest = req.query.roleInterest as string;

      const skip = (page - 1) * limit;

      const filter: any = {};
      if (status) filter.status = status;
      if (isRead !== undefined) filter.isRead = isRead === 'true';
      if (roleInterest) filter.roleInterest = roleInterest;

      const [applications, totalApplications] = await Promise.all([
        CareerModel.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        CareerModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(totalApplications / limit);

      res.status(200).json({
        success: true,
        data: {
          applications,
          pagination: {
            currentPage: page,
            totalPages,
            totalApplications,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get single application by ID
  static async getApplicationById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const application = await CareerModel.findById(id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Career application not found',
        });
      }

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update application status (for admin)
  static async updateApplicationStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, isRead } = req.body;

      const updateData: any = {};
      if (status) updateData.status = status;
      if (isRead !== undefined) updateData.isRead = isRead;

      const updatedApplication = await CareerModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true },
      );

      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: 'Career application not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Application updated successfully',
        data: updatedApplication,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Mark application as read
  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updatedApplication = await CareerModel.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true },
      );

      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: 'Career application not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Application marked as read',
        data: updatedApplication,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete application (for admin)
  static async deleteApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedApplication = await CareerModel.findByIdAndDelete(id);

      if (!deletedApplication) {
        return res.status(404).json({
          success: false,
          message: 'Career application not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Career application deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
