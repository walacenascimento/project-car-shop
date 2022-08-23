import { Router } from 'express';
import CarsModel from '../models/carsModel';
import CarsService from '../services/carsService';
import CarsController from '../controllers/carsController';

const router = Router();

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

router.post('/cars', (req, res) => carsController.create(req, res));

export default router;
