import { Response } from "express";
import { AuthRequest } from "../../types/auth.interface.js";
import { HospitalModel } from "../../model/Hospitals/Hospital.model.js"; 
import { hospitalService } from "../services/hospital.service.js";

export class HospitalController {
    // Implement hospital-related controller methods here
    static async registerHospital(req: AuthRequest, res: Response) {
        // Placeholder for hospital registration logic
        try {
            const authUserId = req.user?.id;
            const { hospitalName, hospitalType, registrationNumber, location, contact, departments, specialties, facilities, services, bedCapacity } = req.body;

            if (!authUserId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            if (!hospitalName || !hospitalType || !registrationNumber || !location || !contact || !departments || !specialties || !facilities || !services || !bedCapacity) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }


            const checkExistingHospital = await HospitalModel.findOne({ registrationNumber });
            if (checkExistingHospital) {
                return res.status(400).json({ success: false, message: 'Hospital with this registration number already exists' });
            }


            const { hospitalData, updatedUser, bedData } = await hospitalService.registerHospital(authUserId, req.body);


            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }


            return res.status(201).json({ success: true, message: 'Hospital registered successfully', hospital: hospitalData, bedCapacity: bedData });
        } catch (err) {
            return res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'An error occurred' });
        }
        res.status(201).json({ success: true, message: 'Hospital registered successfully' });
    }
}