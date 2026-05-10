import express from 'express';
import { createHospital, getHospital, getAllHospitals } from '../controllers/hospital.controller';

const hospitalRouter = express.Router();

hospitalRouter.post('/', createHospital);
hospitalRouter.get('/', getAllHospitals);
hospitalRouter.get('/:id', getHospital);

export default hospitalRouter;