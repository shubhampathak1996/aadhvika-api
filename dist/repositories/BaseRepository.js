"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    applyPopulate(query, populate) {
        if (populate) {
            if (Array.isArray(populate)) {
                populate.forEach((path) => {
                    query = query.populate(path);
                });
            }
            else {
                query = query.populate(populate);
            }
        }
        return query;
    }
    async findById(id, populate) {
        let query = this.model.findById(id);
        query = this.applyPopulate(query, populate);
        return query.exec();
    }
    async findOne(query = {}, populate) {
        let queryBuilder = this.model.findOne(query);
        queryBuilder = this.applyPopulate(queryBuilder, populate);
        return queryBuilder.exec();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async create(data) {
        const entity = new this.model(data);
        return entity.save();
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async findByQuery(query = {}) {
        return this.model
            .find(query)
            .lean()
            .exec();
    }
    async findWithProjection(query = {}, projection) {
        return this.model
            .find(query)
            .select(projection)
            .lean();
    }
    async count(query = {}) {
        return this.model.countDocuments(query);
    }
    async findWithPopulate(populate) {
        return this.applyPopulate(this.model.find(), populate);
    }
    async findWithPagination(query = {}, limit, skip, sort, populate, projection) {
        let queryExec = this.model
            .find(query)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .lean();
        if (projection)
            queryExec = queryExec.select(projection);
        queryExec = this.applyPopulate(queryExec, populate);
        const data = await queryExec.exec();
        return data;
    }
    async createMany(data) {
        const entity = this.model.insertMany(data);
        return entity;
    }
    async updateMany(query = {}, data) {
        const entity = this.model.updateMany(query, data);
        return entity;
    }
    async deleteMany(query = {}) {
        const entity = this.model.deleteMany(query);
        return entity;
    }
    async findAllWithSort(sort = { createdAt: -1 }) {
        const data = await this.model.find().sort(sort).lean();
        return data;
    }
}
exports.BaseRepository = BaseRepository;
