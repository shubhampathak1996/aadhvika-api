// /lib/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

let isConnected: boolean = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}
