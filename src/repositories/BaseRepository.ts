import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  private applyPopulate(
    query: any,
    populate?: string | string[] | object | object[]
  ) {
    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((path) => {
          query = query.populate(path);
        });
      } else {
        query = query.populate(populate);
      }
    }
    return query;
  }

  async findById(id: string, populate?: string | string[]): Promise<T | null> {
    let query = this.model.findById(id);
    query = this.applyPopulate(query, populate);
    return query.exec();
  }
  async findOne(
    query: Partial<T> = {},
    populate?: string | string[]
  ): Promise<T | null> {
    let queryBuilder = this.model.findOne(query as any);
    queryBuilder = this.applyPopulate(queryBuilder, populate);
    return queryBuilder.exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return entity.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findByQuery(query: Partial<T> = {}): Promise<T[]> {
    return this.model
      .find(query as any)
      .lean()
      .exec() as Promise<T[]>;
  }

  async findWithProjection(
    query: Partial<T> = {},
    projection: string
  ): Promise<T[]> {
    return this.model
      .find(query as any)
      .select(projection)
      .lean() as Promise<T[]>;
  }

  async count(query: Partial<T> = {}): Promise<number> {
    return this.model.countDocuments(query as any);
  }

  async findWithPopulate(
    populate: string | string[] | object | object[]
  ): Promise<T[]> {
    return this.applyPopulate(this.model.find(), populate);
  }

  async findWithPagination(
    query: Partial<T> = {},
    limit: number,
    skip: number,
    sort: any,
    populate?: string | string[],
    projection?: string
  ) {
    let queryExec = this.model
      .find(query as any)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .lean();
    if (projection) queryExec = queryExec.select(projection);

    queryExec = this.applyPopulate(queryExec, populate);
    const data = await queryExec.exec();
    return data;
  }

  async createMany(data: Partial<T[]>): Promise<T> {
    const entity = this.model.insertMany(data);
    return entity as unknown as Promise<T>;
  }
  async updateMany(query: Partial<T> = {}, data: Partial<T>): Promise<T> {
    const entity = this.model.updateMany(query as any, data);
    return entity as unknown as Promise<T>;
  }
  async deleteMany(query: Partial<T> = {}): Promise<T> {
    const entity = this.model.deleteMany(query as any);
    return entity as unknown as Promise<T>;
  }

  async findAllWithSort(sort: any = { createdAt: -1 }) {
    const data = await this.model.find().sort(sort).lean();
    return data;
  }
}
