import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;
