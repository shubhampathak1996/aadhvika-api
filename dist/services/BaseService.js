"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const filter_helper_1 = require("../utils/filter-helper");
const qs = __importStar(require("qs"));
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async getById(id) {
        const data = await this.repository.findById(id);
        return JSON.parse(JSON.stringify(data));
    }
    async getOne(query) {
        const data = await this.repository.findOne(query);
        return JSON.parse(JSON.stringify(data));
    }
    async getOneByPopulate(query, populate) {
        const data = await this.repository.findOne(query, populate);
        return JSON.parse(JSON.stringify(data));
    }
    async getAll() {
        return this.repository.findAll();
    }
    async create(data) {
        const created = await this.repository.create(data);
        return JSON.parse(JSON.stringify(created));
    }
    async update(id, data) {
        const updated = await this.repository.update(id, data);
        return JSON.parse(JSON.stringify(updated));
    }
    async delete(id) {
        const deleted = await this.repository.delete(id);
        return JSON.parse(JSON.stringify(deleted));
    }
    async getByQuery(query) {
        return this.repository.findByQuery(query);
    }
    async getWithProjection(query, projection) {
        const data = await this.repository.findWithProjection(query, projection);
        return JSON.parse(JSON.stringify(data));
    }
    async getWithPopulate(populate) {
        const data = await this.repository.findWithPopulate(populate);
        return JSON.parse(JSON.stringify(data));
    }
    async count(query) {
        return this.repository.count(query);
    }
    async findWithPagination(query, limit, skip, projection) {
        return this.repository.findWithPagination(query, limit, skip, projection);
    }
    async createMany(data) {
        const created = await this.repository.createMany(data);
        return JSON.parse(JSON.stringify(created));
    }
    async updateMany(query, data) {
        const updatedMany = await this.repository.updateMany(query, data);
        return JSON.parse(JSON.stringify(updatedMany));
    }
    async deleteMany(query) {
        const deletedMany = await this.repository.deleteMany(query);
        return JSON.parse(JSON.stringify(deletedMany));
    }
    async findWithCustomQueryPagination(query, limit, page, populate, sort = { createdAt: -1 }, projection) {
        const queryString = qs.stringify(query, {
            encodeValuesOnly: true,
        });
        const finalQuery = qs.parse(queryString);
        const updatedQuery = (0, filter_helper_1.filterData)({ query: finalQuery });
        const count = await this.repository.count(updatedQuery);
        // Total Pages
        const total_pages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;
        const data = await this.repository.findWithPagination(updatedQuery, limit, skip, sort, populate, projection);
        return JSON.parse(JSON.stringify({
            data,
            pages: total_pages,
            page,
            count,
            limit,
        }));
    }
    async findWithCustomQuery(query) {
        const queryString = qs.stringify(query, {
            encodeValuesOnly: true,
        });
        const finalQuery = qs.parse(queryString);
        const updatedQuery = (0, filter_helper_1.filterData)({ query: finalQuery });
        const count = await this.repository.count(updatedQuery);
        const data = await this.repository.findByQuery(updatedQuery);
        return JSON.parse(JSON.stringify({
            data,
        }));
    }
    async findAllWithSort(sort) {
        const data = await this.repository.findAllWithSort(sort);
        return JSON.parse(JSON.stringify({
            data,
        }));
    }
}
exports.BaseService = BaseService;
