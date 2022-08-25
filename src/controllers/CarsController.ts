import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) {}

  public async create(
    req: Request & { body: ICar },
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, buyValue, doorsQty, seatsQty };
    const newCar = await this._service.create(car);

    if (!newCar) {
      return res.status(400);
    }
    return res.status(201).json(newCar);
  }

  // Retornar todos os carros Req. 8
  public async read(_req: Request, res: Response<ICar[]>) {
    const car = await this._service.read();
    return res.status(200).json(car);
  }
}