import { Router } from 'express'; 

import Motorcycles from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const router = Router();

const motorcycle = new Motorcycles();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleControl = new MotorcycleController(motorcycleService);

router.post('/motorcycles', (req, res) => motorcycleControl.create(req, res));

export default router;