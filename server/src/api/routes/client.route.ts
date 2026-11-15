import express from 'express';
import { PatientController } from '../controllers/patient.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';



const patientRouter = express.Router();

patientRouter.post('/', authMiddleware, PatientController.registerPatient);

export default patientRouter;