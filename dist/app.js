"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const constants_1 = require("./constants");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const EnvSetup_1 = __importDefault(require("./utils/EnvSetup"));
const db_1 = require("./config/db");
const path_1 = __importDefault(require("path"));
const UploadRoutes_1 = __importDefault(require("./routes/UploadRoutes"));
const CareerRoutes_1 = __importDefault(require("./routes/CareerRoutes"));
const EnquiryRoutes_1 = __importDefault(require("./routes/EnquiryRoutes"));
const BlogRoutes_1 = __importDefault(require("./routes/BlogRoutes"));
const CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
EnvSetup_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
        this.errorHandling();
        (0, db_1.connectDB)();
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        // Handle payload too large error
        this.app.use((err, req, res, next) => {
            if (err.type === 'entity.too.large') {
                return res.status(413).json({
                    success: false,
                    message: 'Request payload is too large. Maximum allowed size is 100MB.',
                });
            }
            next(err);
        });
    }
    routes() {
        this.app.use(constants_1.ROUTES.UPLOAD, UploadRoutes_1.default);
        this.app.use(constants_1.ROUTES.CAREERS, CareerRoutes_1.default);
        this.app.use(constants_1.ROUTES.ENQUIRIES, EnquiryRoutes_1.default);
        this.app.use(constants_1.ROUTES.BLOG, BlogRoutes_1.default);
        this.app.use(constants_1.ROUTES.CATEGORY, CategoryRoutes_1.default);
        const _dirname = path_1.default.resolve();
        this.app.use('/uploads', express_1.default.static(path_1.default.join(_dirname, '/uploads')));
    }
    errorHandling() {
        this.app.use(errorHandler_1.default);
    }
}
exports.default = new App().app;
