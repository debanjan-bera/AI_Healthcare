import express from 'express';
import { createPatient, getPatient, getAllPatients } from '../controllers/patient.controller';

const patientRouter = express.Router();

patientRouter.post('/', createPatient);
patientRouter.get('/', getAllPatients);
patientRouter.get('/:id', getPatient);

export default patientRouter;
