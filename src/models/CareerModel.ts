import { Schema, model, Document } from 'mongoose';

export interface ICareer extends Document {
  fullName: string;
  email: string;
  phone: string;
  roleInterest: string;
  message?: string;
  consent: boolean;
  isRead?: boolean;
  status?: 'new' | 'in-progress' | 'resolved';
  createdAt?: Date;
  updatedAt?: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [2, 'Full name must be at least 2 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 characters'],
      maxlength: [15, 'Phone number is too long'],
      trim: true,
    },
    roleInterest: {
      type: String,
      required: [true, 'Role interest is required'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
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
  {
    timestamps: true,
  },
);

export const CareerModel = model<ICareer>('Career', CareerSchema);
