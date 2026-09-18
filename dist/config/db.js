"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
// /lib/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}
let isConnected = false;
async function connectDB() {
    if (isConnected) {
        return;
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        isConnected = true;
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}
