import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { ROUTES } from './constants';
import errorHandler from './middlewares/errorHandler';
import dotenv from './utils/EnvSetup';
import { connectDB } from './config/db';
import path from 'path';

import UploadRoutes from './routes/UploadRoutes';
import CareerRoutes from './routes/CareerRoutes';
import AppointmentBookingRoutes from './routes/AppointmentBookingRoutes';
import BlogRoutes from './routes/BlogRoutes';
import CategoryRoutes from './routes/CategoryRoutes';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandling();
    connectDB();
  }

  private middleware(): void {
    this.app.use(cors());
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.app.use(morgan('dev'));

    // Handle payload too large error
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (err.type === 'entity.too.large') {
          return res.status(413).json({
            success: false,
            message:
              'Request payload is too large. Maximum allowed size is 100MB.',
          });
        }
        next(err);
      },
    );
  }

  private routes(): void {
    this.app.use(ROUTES.UPLOAD, UploadRoutes);
    this.app.use(ROUTES.CAREERS, CareerRoutes);
    this.app.use(ROUTES.APPOINTMENT_BOOKINGS, AppointmentBookingRoutes);
    this.app.use(ROUTES.BLOG, BlogRoutes);
    this.app.use(ROUTES.CATEGORY, CategoryRoutes);

    const _dirname = path.resolve();
    this.app.use('/uploads', express.static(path.join(_dirname, '/uploads')));
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default new App().app;
