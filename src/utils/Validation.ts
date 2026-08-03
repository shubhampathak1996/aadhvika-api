import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodError, ZodSchema } from 'zod';

class Validation {
  static validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({ success: false, error: error.issues });
        } else {
          res
            .status(500)
            .json({ success: false, error: 'Internal server error' });
        }
      }
    };
  }

  static validateParams(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedParams = schema.parse(req.params);
        req.validatedParams = validatedParams;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: error.issues,
          });
        }
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    };
  }

  static validateQuery(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedQuery = schema.parse(req.query);
        // Store validated query in a custom property instead of overwriting req.query
        (req as any).validatedQuery = validatedQuery;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400).json({ success: false, error: error.issues });
        } else {
          res
            .status(500)
            .json({ success: false, error: 'Internal server error' });
        }
      }
    };
  }
}

export default Validation;
