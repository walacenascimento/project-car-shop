import { ErrorTypes } from '../errors/catalog';
import { motorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const motorcycle = motorcycleZodSchema.safeParse(obj);
    if (!motorcycle.success) throw motorcycle.error;
    return this._motorcycle.create(obj);
  }

  public async read():Promise<IMotorcycle[]> {
    const motorcycle = await this._motorcycle.read();

    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return (motorcycle);
  }

  public async readOne(_id: string):Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj:IMotorcycle):
  Promise<IMotorcycle | null> {
    const motorcycleUpdate = motorcycleZodSchema.safeParse(obj);

    if (!motorcycleUpdate.success) throw motorcycleUpdate.error;
    await this.readOne(_id);
    return this._motorcycle.update(_id, obj);
  }

  public async delete(_id: string):Promise<IMotorcycle | null> {
    await this._motorcycle.readOne(_id);
    return this._motorcycle.delete(_id);
  }
}
