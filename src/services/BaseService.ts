import { filterData } from '../utils/filter-helper';
import { BaseRepository } from '../repositories/BaseRepository';
import { Document } from 'mongoose';
import * as qs from 'qs';

export class BaseService<T extends Document> {
  private repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getById(id: string): Promise<T | null> {
    const data = await this.repository.findById(id);
    return JSON.parse(JSON.stringify(data));
  }
  async getOne(query: any): Promise<T | null> {
    const data = await this.repository.findOne(query);

    return JSON.parse(JSON.stringify(data));
  }

  async getOneByPopulate(
    query: any,
    populate: string | string[]
  ): Promise<T | null> {
    const data = await this.repository.findOne(query, populate);
    return JSON.parse(JSON.stringify(data));
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(data: Partial<T>): Promise<T> {
    const created = await this.repository.create(data);
    return JSON.parse(JSON.stringify(created));
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updated = await this.repository.update(id, data);
    return JSON.parse(JSON.stringify(updated));
  }

  async delete(id: string): Promise<T | null> {
    const deleted = await this.repository.delete(id);
    return JSON.parse(JSON.stringify(deleted));
  }
  async getByQuery(query: any): Promise<T[]> {
    return this.repository.findByQuery(query);
  }

  async getWithProjection(query: any, projection: string): Promise<T[]> {
    const data = await this.repository.findWithProjection(query, projection);
    return JSON.parse(JSON.stringify(data));
  }

  async getWithPopulate(
    populate: string | string[] | object | object[]
  ): Promise<T[]> {
    const data = await this.repository.findWithPopulate(populate);
    return JSON.parse(JSON.stringify(data));
  }

  async count(query: any): Promise<number> {
    return this.repository.count(query);
  }

  async findWithPagination(
    query: any,
    limit: number,
    skip: number,
    projection?: string
  ) {
    return this.repository.findWithPagination(query, limit, skip, projection);
  }

  async createMany(data: any): Promise<T> {
    const created = await this.repository.createMany(data);
    return JSON.parse(JSON.stringify(created));
  }
  async updateMany(query: any, data: Partial<T>): Promise<T> {
    const updatedMany = await this.repository.updateMany(query, data);
    return JSON.parse(JSON.stringify(updatedMany));
  }

  async deleteMany(query: any): Promise<T> {
    const deletedMany = await this.repository.deleteMany(query);
    return JSON.parse(JSON.stringify(deletedMany));
  }

  async findWithCustomQueryPagination(
    query: any,
    limit: number,
    page: number,
    populate?: string | string[],
    sort = { createdAt: -1 } as any,
    projection?: string
  ) {
    const queryString = qs.stringify(query, {
      encodeValuesOnly: true,
    });
    const finalQuery = qs.parse(queryString);

    const updatedQuery = filterData({ query: finalQuery });

    const count = await this.repository.count(updatedQuery);
    // Total Pages
    const total_pages = Math.ceil(count / limit);
    const skip = (page - 1) * limit;

    const data = await this.repository.findWithPagination(
      updatedQuery,
      limit,
      skip,
      sort,
      populate,
      projection
    );

    return JSON.parse(
      JSON.stringify({
        data,
        pages: total_pages,
        page,
        count,
        limit,
      })
    );
  }

  async findWithCustomQuery(query: any) {
    const queryString = qs.stringify(query, {
      encodeValuesOnly: true,
    });
    const finalQuery = qs.parse(queryString);

    const updatedQuery = filterData({ query: finalQuery });

    const count = await this.repository.count(updatedQuery);

    const data = await this.repository.findByQuery(updatedQuery);

    return JSON.parse(
      JSON.stringify({
        data,
      })
    );
  }

  async findAllWithSort(sort: any) {
    const data = await this.repository.findAllWithSort(sort);

    return JSON.parse(
      JSON.stringify({
        data,
      })
    );
  }
}
