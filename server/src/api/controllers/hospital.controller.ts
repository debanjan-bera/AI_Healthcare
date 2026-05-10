import { Request, Response } from 'express';
import { HospitalModel } from '../../model/Hospital.model';

export const createHospital = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, location, contact, emergency_contact, total_beds, available_beds } = req.body;
        const newHospital = new HospitalModel({ name, location, contact, emergency_contact, total_beds, available_beds });
        await newHospital.save();
        res.status(201).json({ success: true, data: newHospital });
    } catch (error: any) {
        console.error("Error creating hospital:", error.message);
        res.status(500).json({ success: false, error: 'Failed to create hospital' });
    }
};

export const getHospital = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const hospital = await HospitalModel.findById(id);
        if (!hospital) {
            res.status(404).json({ success: false, error: 'Hospital not found' });
            return;
        }
        res.status(200).json({ success: true, data: hospital });
    } catch (error: any) {
        console.error("Error fetching hospital:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch hospital' });
    }
};

export const getAllHospitals = async (req: Request, res: Response): Promise<void> => {
    try {
        const hospitals = await HospitalModel.find();
        res.status(200).json({ success: true, data: hospitals });
    } catch (error: any) {
        console.error("Error fetching hospitals:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch hospitals' });
    }
};
