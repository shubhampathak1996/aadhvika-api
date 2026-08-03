import { Request, Response } from 'express';
import AppointmentBookingModel from '../models/AppointmentBookingModel';

export class AppointmentBookingController {
  // Public: submit a booking request
  static async createBooking(req: Request, res: Response) {
    try {
      const { fullName, phone, enquiryFor, comments, consent } = req.body;

      if (!fullName || !phone || !enquiryFor || consent === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Full name, phone, enquiry type and consent are required.',
        });
      }

      if (!consent) {
        return res.status(400).json({
          success: false,
          message: 'You must agree to continue.',
        });
      }

      const booking = await AppointmentBookingModel.create({
        fullName,
        phone,
        enquiryFor,
        comments,
        consent,
      });

      res.status(201).json({
        success: true,
        message: 'Appointment request submitted successfully.',
        data: booking,
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
        message: 'Failed to submit appointment request',
        error: error.message,
      });
    }
  }

  // Admin: get all bookings with pagination and filters
  static async getAllBookings(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const status = req.query.status as string;
      const isRead = req.query.isRead as string;

      const filter: Record<string, any> = {};
      if (status) filter.status = status;
      if (isRead !== undefined) filter.isRead = isRead === 'true';

      const [bookings, total] = await Promise.all([
        AppointmentBookingModel.find(filter)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        AppointmentBookingModel.countDocuments(filter),
      ]);

      res.status(200).json({
        success: true,
        data: bookings,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch appointment bookings',
        error: error.message,
      });
    }
  }

  // Admin: get single booking by ID
  static async getBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await AppointmentBookingModel.findById(id);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Appointment booking not found',
        });
      }

      res.status(200).json({ success: true, data: booking });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch appointment booking',
        error: error.message,
      });
    }
  }

  // Admin: mark as read / update status
  static async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isRead, status } = req.body;

      const booking = await AppointmentBookingModel.findByIdAndUpdate(
        id,
        { isRead, status },
        { new: true, runValidators: true },
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Appointment booking not found',
        });
      }

      res.status(200).json({ success: true, data: booking });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to update appointment booking',
        error: error.message,
      });
    }
  }

  // Admin: delete booking
  static async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await AppointmentBookingModel.findByIdAndDelete(id);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Appointment booking not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Appointment booking deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete appointment booking',
        error: error.message,
      });
    }
  }
}
