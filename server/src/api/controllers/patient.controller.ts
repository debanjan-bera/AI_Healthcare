import { Request, Response } from 'express';
import { PatientModel } from '../../model/Patient.model';

export const createPatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, age, gender, medical_history, contact } = req.body;
        const newPatient = new PatientModel({ name, age, gender, medical_history, contact });
        await newPatient.save();
        res.status(201).json({ success: true, data: newPatient });
    } catch (error: any) {
        console.error("Error creating patient:", error.message);
        res.status(500).json({ success: false, error: 'Failed to create patient' });
    }
};

export const getPatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const patient = await PatientModel.findById(id);
        if (!patient) {
            res.status(404).json({ success: false, error: 'Patient not found' });
            return;
        }
        res.status(200).json({ success: true, data: patient });
    } catch (error: any) {
        console.error("Error fetching patient:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch patient' });
    }
};

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const patients = await PatientModel.find();
        res.status(200).json({ success: true, data: patients });
    } catch (error: any) {
        console.error("Error fetching patients:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch patients' });
    }
};
