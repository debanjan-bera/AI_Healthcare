import express from 'express';
import { createPharmacy, getPharmacy, getAllPharmacies } from '../controllers/pharmacy.controller';

const pharmacyRouter = express.Router();

pharmacyRouter.post('/', createPharmacy);
pharmacyRouter.get('/', getAllPharmacies);
pharmacyRouter.get('/:id', getPharmacy);

export default pharmacyRouter;
