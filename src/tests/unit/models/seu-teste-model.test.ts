// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import carsModel from '../../../models/CarsModel';
import { carMock, carMockWithId, allCarMock} from '../../mock/carMock';

describe('Test Car Model', () => {
    const carModel = new carsModel();

    before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(allCarMock);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockWithId);

  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a Car', () => {
    it('Successfully created', async () => {
        const newCar = await carModel.create(carMock)
        expect(newCar).to.be.deep.equal(carMockWithId);
      });
  });

  describe('seaching all cars', () => {
    it('Sucessfully found all cars', async () => {
      const car = await carModel.read();
      expect(car).to.be.deep.equal(allCarMock);
    });
  })

  describe('seaching a car', () => {
    it('Sucessfully found', async () => {
      const car = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Not found _id', async () => {
      try {
        await carModel.readOne('4edd40c86762e')
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId')
      }
    });
  })

  describe('Remove a car', () => {
    it('Sucessfully removed', async () => {
      const car = await carModel.delete('4edd40c86762e0fb12000003');
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('_id not found to removed', async () => {
      try {
        await carModel.readOne('4edd40c86762e')
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId')
      }
    });
  });

});