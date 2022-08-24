// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
// import chai from 'chai';
import { expect } from 'chai';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import { carMock, carMockWithId } from '../../mock/carMock'
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog'

describe('Test Car Service', () => {
    const carsModel = new CarsModel();
    const carsService = new CarsService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car service', () => {
      it('Successfully created', async () => {
        const newCar =  await carsService.create(carMock);
        expect(newCar).to.be.deep.equal(carMockWithId);
      });
  })

});