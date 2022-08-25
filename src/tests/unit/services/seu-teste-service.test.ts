// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
// import chai from 'chai';
import { expect } from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog'
import { carMock, carMockWithId, allCarMock } from '../../mock/carMock'
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';

describe('Test Car Service', () => {
    const carsModel = new CarsModel();
    const carsService = new CarsService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
    sinon.stub(carsModel, 'read').resolves(allCarMock);
    sinon.stub(carsModel, 'update').resolves(carMockWithId);
    sinon.stub(carsModel, 'delete').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car service', () => {
      it('Successfully created', async () => {
        const newCar =  await carsService.create(carMock);
        expect(newCar).to.be.deep.equal(carMockWithId);
      });

      it('Failure create a car', async () => {
        try {
          await carsService.create({} as any);
        } catch (error) {
          expect(error).to.be.instanceOf(ZodError);
        }
      })
  })

  describe('Read all cars service ', () => {
    it('Sucess read all cars', async () => {
      const car = await carsService.read();
      expect(car).to.be.deep.equal(allCarMock);
    })
  })

  // describe('Update a car service ', () => {
  //   it('Sucess update a car', async () => {
  //     const car = await carsService.update('4edd40c86762e0fb12000003', carMock);
  //     expect(car).to.be.deep.equal(carMockWithId);
  //   });
  // });

  // describe('Delete a car service ', () => {
  //   it('Sucess delete a car', async () => {
  //     const car = await carsService.delete('4edd40c86762e0fb12000003');
  //     expect(car).to.be.deep.equal(carMockWithId);
  //   });
  // });

});