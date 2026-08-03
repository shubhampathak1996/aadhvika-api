import express from 'express';
import { AppointmentBookingController } from '../controllers/AppointmentBookingController';

class AppointmentBookingRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    // Public
    this.router.post('/', AppointmentBookingController.createBooking);

    // Admin
    this.router.get('/', AppointmentBookingController.getAllBookings);
    this.router.get('/:id', AppointmentBookingController.getBookingById);
    this.router.put('/:id', AppointmentBookingController.updateBooking);
    this.router.delete('/:id', AppointmentBookingController.deleteBooking);
  }
}

export default new AppointmentBookingRoutes().router;
