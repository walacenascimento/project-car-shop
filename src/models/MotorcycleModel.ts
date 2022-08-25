import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotorcyclesMongooseSchema = new Schema<IMotorcycle>({
  // _id: '4edd40c86762e0fb12000003',
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class Motorcycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel(
    'Motorcycles',
    MotorcyclesMongooseSchema,
  )) {
    super(model);
  }
}

export default Motorcycles;
