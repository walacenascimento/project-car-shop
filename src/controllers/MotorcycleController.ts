import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  // Req 19
  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { 
      model, year, color, buyValue, category, engineCapacity };

    const newMotorcycle = await this._service.create(motorcycle);

    if (!newMotorcycle) {
      res.status(400);
    }
    return res.status(201).json(newMotorcycle);
  }

  // Req 20
  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycle = await this._service.read();
    return res.status(200).json(motorcycle);
  }

  // Req 21
  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const motorcycle = await this._service.readOne(req.params.id);
    return res.status(200).json(motorcycle);
  }

  // Req 22
  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const motorcycle = await this._service.update(req.params.id, req.body);
    return res.status(200).json(motorcycle);
  }

  // Req 23
  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    const motorcycle = await this._service.delete(req.params.id);
    return res.status(204).json(motorcycle);
  }
}
