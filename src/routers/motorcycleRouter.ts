import { Router } from 'express'; 

import Motorcycles from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const router = Router();

const motorcycle = new Motorcycles();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleCon = new MotorcycleController(motorcycleService);
const motorcycleId = '/motorcycles/:id';

router.post('/motorcycles', (req, res) => motorcycleCon.create(req, res));
router.get('/motorcycles', (req, res) => motorcycleCon.read(req, res));
// router.get('/motorcycles/:id', (req, res) => motorcycleCon.readOne(req, res));
router.get(motorcycleId, (req, res) => motorcycleCon.readOne(req, res));
router.put(motorcycleId, (req, res) => motorcycleCon.update(req, res));
router.delete(motorcycleId, (req, res) => motorcycleCon.delete(req, res));

export default router;