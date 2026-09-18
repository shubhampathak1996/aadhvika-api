"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class Validation {
    static validate(schema) {
        return (req, res, next) => {
            try {
                req.body = schema.parse(req.body);
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json({ success: false, error: error.issues });
                }
                else {
                    res
                        .status(500)
                        .json({ success: false, error: 'Internal server error' });
                }
            }
        };
    }
    static validateParams(schema) {
        return (req, res, next) => {
            try {
                const validatedParams = schema.parse(req.params);
                req.validatedParams = validatedParams;
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
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
    static validateQuery(schema) {
        return (req, res, next) => {
            try {
                const validatedQuery = schema.parse(req.query);
                // Store validated query in a custom property instead of overwriting req.query
                req.validatedQuery = validatedQuery;
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).json({ success: false, error: error.issues });
                }
                else {
                    res
                        .status(500)
                        .json({ success: false, error: 'Internal server error' });
                }
            }
        };
    }
}
exports.default = Validation;
