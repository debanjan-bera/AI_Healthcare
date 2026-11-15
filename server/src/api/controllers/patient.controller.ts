import { Request, Response } from "express";
import userModel from "../../model/user.model.js";
import { UserRole } from "../../types/interface/user.type.js";
import { PatientModel } from "../../model/Patient.model.js";
import { AuthRequest } from "../../types/auth.interface.js";
import { checkExistingUser } from "../services/auth.service.js";
import { checkExistingPatient, registerPatientService } from "../services/patient.service.js";

export class PatientController {
    static async registerPatient(req: AuthRequest, res: Response) {
        try {
            const authUserId = req.user?.id;
            if (!authUserId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const {
                dob, gender, preferredLanguage,
                height, weight, bloodGroup,
                location
            } = req.body;

            if (!dob || !gender || !preferredLanguage || !height || !weight || !bloodGroup || !location ) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            const existingUser = await checkExistingUser(authUserId);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const existingPatient = await checkExistingPatient(authUserId);

            if (existingPatient) {
                return res.status(400).json({
                    success: false,
                    message: "Patient profile already exists for this user"
                });
            }
            const { patientData, updatedUser, locationData } = await registerPatientService(authUserId, req.body);
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(201).json({ success: true, message: 'Patient registered successfully', patient: patientData, location: locationData });

        } catch (err) {
            return res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'An error occurred' });
        }


    }
}