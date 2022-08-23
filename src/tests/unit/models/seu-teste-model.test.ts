// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import carsModel from '../../../models/carsModel';
import { carMock, carMockWithId} from '../../mock/carMock';

describe('Test Car Model', () => {
    const carModel = new carsModel();

    before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);

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

});