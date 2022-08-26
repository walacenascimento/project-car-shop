import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

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
}
