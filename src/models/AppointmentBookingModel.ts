import { Schema, model, models, Document } from 'mongoose';

export interface IAppointmentBooking extends Document {
  fullName: string;
  phone: string;
  enquiryFor: string;
  comments?: string;
  consent: boolean;
  isRead: boolean;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentBookingSchema = new Schema<IAppointmentBooking>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [2, 'Full name must be at least 2 characters'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 digits'],
      maxlength: [15, 'Phone number is too long'],
      trim: true,
    },
    enquiryFor: {
      type: String,
      required: [true, 'Enquiry type is required'],
      enum: {
        values: ['skin', 'hair', 'body', 'face'],
        message: 'Invalid enquiry type',
      },
      trim: true,
    },
    comments: {
      type: String,
      trim: true,
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
      validate: {
        validator: (v: boolean) => v === true,
        message: 'You must agree to continue',
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true },
);

export const AppointmentBookingModel =
  models.AppointmentBooking ||
  model<IAppointmentBooking>('AppointmentBooking', AppointmentBookingSchema);

export default AppointmentBookingModel;
