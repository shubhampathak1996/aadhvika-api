import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';

class BaseController {
  protected handleRequest = (
    callback: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      callback(req, res, next).catch(next);
    };
  };

  public create = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const item = await service.create(req.body);
      res.status(201).json({ success: true, data: item });
    });

  public createMany = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const item = await service.createMany(req.body);
      res.status(201).json({ success: true, data: item });
    });

  public getAll = (
    service: any,
    populate?: string | string[],
    projection?: string
  ) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;

      // Use the MongoDB query from request query parameters
      const query = { ...req.query };
      delete query.limit;
      delete query.page;

      const result = await service.findWithCustomQueryPagination(
        query,
        limit,
        page,
        populate,
        req.query.sort || { createdAt: -1 },
        projection
      );

      res.json({
        success: true,
        data: result.data,
        count: result.count,
        limit: result.limit,
        page: result.page,
        pages: result.pages,
      });
    });

  public exists = (service: any) =>
    this.handleRequest(
      async (req: Request, res: Response, next: NextFunction) => {
        const item = await service.getById(req.params.id);
        if (item) {
          next();
        } else {
          res.status(404).json({ success: false, message: 'Item not found' });
        }
      }
    );

  public slugify = (service: any, field: any) =>
    this.handleRequest(
      async (req: Request, res: Response, next: NextFunction) => {
        const title = req.body[field];

        if (title) {
          const slug = slugify(title, {
            lower: true, // convert to lowercase
            strict: true, // remove special characters
          });

          const item = await service.getOne({ slug });
          if (item) {
            req.body.slug = `${slug}-${Date.now()}`;
          } else {
            req.body.slug = slug;
          }
        }
        next();
      }
    );

  public getById = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const item = await service.getById(req.params.id);
      res.json({ success: true, data: item });
    });

  public getOne = (service: any, queryField?: string) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const query = queryField
        ? { [queryField]: req.params[queryField] }
        : req.body;
      const item = await service.getOne(query);
      res.json({ success: true, data: item });
    });

  public getWithPopulate = (
    service: any,
    populate: string | string[] | object | object[]
  ) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const items = await service.getWithPopulate(populate);
      res.json({ success: true, data: items });
    });

  public getByQuery = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const items = await service.getByQuery(req.query);
      res.json({ success: true, data: items });
    });

  public getWithProjection = (service: any, projection: string) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const items = await service.getWithProjection(req.query, projection);
      res.json({ success: true, data: items });
    });

  public update = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const item = await service.update(req.params.id, req.body);
      res.json({ success: true, data: item });
    });

  public updateMany = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const { query, updateData } = req.body;
      const result = await service.updateMany(query, updateData);
      res.json({ success: true, data: result });
    });

  public delete = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const result = await service.delete(req.params.id);
      res.json({ success: true, data: result });
    });

  public deleteMany = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const result = await service.deleteMany(req.body);
      res.json({ success: true, data: result });
    });

  public count = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const count = await service.count(req.query);
      res.json({ success: true, count });
    });

  public findWithCustomQuery = (service: any) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const result = await service.findWithCustomQuery(req.query);
      res.json({ success: true, data: result.data });
    });

  public findAllWithSort = (service: any, defaultSort = { createdAt: -1 }) =>
    this.handleRequest(async (req: Request, res: Response) => {
      const sort = req.body.sort || defaultSort;
      const result = await service.findAllWithSort(sort);
      res.json({ success: true, data: result.data });
    });
}

export default BaseController;
