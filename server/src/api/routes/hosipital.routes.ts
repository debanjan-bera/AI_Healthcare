import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { HospitalController } from "../controllers/hospital.controller.js";

const hospitalRoutes = express.Router();

hospitalRoutes.post("/register", authMiddleware, HospitalController.registerHospital);

export default hospitalRoutes;

