import express from 'express';
import { EnquiryController } from '../controllers/EnquiryController';

class EnquiryRoutes {
  public router = express.Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    // Public
    this.router.post('/', EnquiryController.createEnquiry);

    // Admin
    this.router.get('/', EnquiryController.getAllEnquiries);
    this.router.get('/:id', EnquiryController.getEnquiryById);
    this.router.put('/:id', EnquiryController.updateEnquiry);
    this.router.delete('/:id', EnquiryController.deleteEnquiry);
  }
}

export default new EnquiryRoutes().router;
