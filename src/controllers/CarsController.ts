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

  // Retronar um carro, filtrando pelo Id Req. 9
  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._service.readOne(req.params._id);
    return res.status(200).json(car);
  }

  // Req 13
  public async update(req: Request, res: Response<ICar | null>) {
    const carUpdate = await this._service.update(req.params.id, req.body);
    return res.status(200).json(carUpdate);
  }
}