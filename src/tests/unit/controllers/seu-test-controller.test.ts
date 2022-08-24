// template para criação dos testes de cobertura da camada de controller

import * as sinon from 'sinon';
import { expect } from 'chai';
// const { expect } = chai;
import { Request, Response } from 'express';
import { carMock, carMockWithId } from '../../mock/carMock';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController'

describe('Test Car Controller', () => {
    const carsModel = new CarsModel();
    const carsService = new CarsService(carsModel);
    const carsController = new CarsController(carsService);
    const req = {} as Request;
    const res = {} as Response;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car controller', () => {
      it('Successfully created', async () => {
        req.body = carMock;
        await carsController.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
      });
  })

});