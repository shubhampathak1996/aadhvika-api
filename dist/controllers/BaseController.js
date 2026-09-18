"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
class BaseController {
    constructor() {
        this.handleRequest = (callback) => {
            return (req, res, next) => {
                callback(req, res, next).catch(next);
            };
        };
        this.create = (service) => this.handleRequest(async (req, res) => {
            const item = await service.create(req.body);
            res.status(201).json({ success: true, data: item });
        });
        this.createMany = (service) => this.handleRequest(async (req, res) => {
            const item = await service.createMany(req.body);
            res.status(201).json({ success: true, data: item });
        });
        this.getAll = (service, populate, projection) => this.handleRequest(async (req, res) => {
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            // Use the MongoDB query from request query parameters
            const query = { ...req.query };
            delete query.limit;
            delete query.page;
            const result = await service.findWithCustomQueryPagination(query, limit, page, populate, req.query.sort || { createdAt: -1 }, projection);
            res.json({
                success: true,
                data: result.data,
                count: result.count,
                limit: result.limit,
                page: result.page,
                pages: result.pages,
            });
        });
        this.exists = (service) => this.handleRequest(async (req, res, next) => {
            const item = await service.getById(req.params.id);
            if (item) {
                next();
            }
            else {
                res.status(404).json({ success: false, message: 'Item not found' });
            }
        });
        this.slugify = (service, field) => this.handleRequest(async (req, res, next) => {
            const title = req.body[field];
            if (title) {
                const slug = (0, slugify_1.default)(title, {
                    lower: true, // convert to lowercase
                    strict: true, // remove special characters
                });
                const item = await service.getOne({ slug });
                if (item) {
                    req.body.slug = `${slug}-${Date.now()}`;
                }
                else {
                    req.body.slug = slug;
                }
            }
            next();
        });
        this.getById = (service) => this.handleRequest(async (req, res) => {
            const item = await service.getById(req.params.id);
            res.json({ success: true, data: item });
        });
        this.getOne = (service, queryField) => this.handleRequest(async (req, res) => {
            const query = queryField
                ? { [queryField]: req.params[queryField] }
                : req.body;
            const item = await service.getOne(query);
            res.json({ success: true, data: item });
        });
        this.getWithPopulate = (service, populate) => this.handleRequest(async (req, res) => {
            const items = await service.getWithPopulate(populate);
            res.json({ success: true, data: items });
        });
        this.getByQuery = (service) => this.handleRequest(async (req, res) => {
            const items = await service.getByQuery(req.query);
            res.json({ success: true, data: items });
        });
        this.getWithProjection = (service, projection) => this.handleRequest(async (req, res) => {
            const items = await service.getWithProjection(req.query, projection);
            res.json({ success: true, data: items });
        });
        this.update = (service) => this.handleRequest(async (req, res) => {
            const item = await service.update(req.params.id, req.body);
            res.json({ success: true, data: item });
        });
        this.updateMany = (service) => this.handleRequest(async (req, res) => {
            const { query, updateData } = req.body;
            const result = await service.updateMany(query, updateData);
            res.json({ success: true, data: result });
        });
        this.delete = (service) => this.handleRequest(async (req, res) => {
            const result = await service.delete(req.params.id);
            res.json({ success: true, data: result });
        });
        this.deleteMany = (service) => this.handleRequest(async (req, res) => {
            const result = await service.deleteMany(req.body);
            res.json({ success: true, data: result });
        });
        this.count = (service) => this.handleRequest(async (req, res) => {
            const count = await service.count(req.query);
            res.json({ success: true, count });
        });
        this.findWithCustomQuery = (service) => this.handleRequest(async (req, res) => {
            const result = await service.findWithCustomQuery(req.query);
            res.json({ success: true, data: result.data });
        });
        this.findAllWithSort = (service, defaultSort = { createdAt: -1 }) => this.handleRequest(async (req, res) => {
            const sort = req.body.sort || defaultSort;
            const result = await service.findAllWithSort(sort);
            res.json({ success: true, data: result.data });
        });
    }
}
exports.default = BaseController;
