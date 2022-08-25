import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }
  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }
  
  // Retornar todos os carros criado Req. 8
  public async read():Promise<ICar[]> {
    const car = await this._car.read();
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  // Retronar um carro, filtrando pelo ID Req. 9
  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    // if (_id.length < 24) {
    //   const idLength = JSON.stringify({
    //     code: 400,
    //     error: 'Id must have 24 hexadecimal characters',
    //   });
    //   throw new Error(idLength);
    // } 
    return car;
  }

  // Req 13
  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    const carUpdate = carZodSchema.safeParse(obj);
    if (!carUpdate.success) throw carUpdate.error;

    await this.readOne(_id);
    return this._car.update(_id, obj);
  }
}
