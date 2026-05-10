import { Request, Response } from 'express';
import { PharmacyModel } from '../../model/Pharmacy.model';

export const createPharmacy = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pharmacyName, address, contact, drugLicenseNumber,userId } = req.body;
        const newPharmacy = new PharmacyModel({ pharmacyName, address, contact, drugLicenseNumber,userId });
        await newPharmacy.save();
        res.status(201).json({ success: true, data: newPharmacy });
    } catch (error: any) {
        console.error("Error creating pharmacy:", error.message);
        res.status(500).json({ success: false, error: 'Failed to create pharmacy' });
    }
};

export const getPharmacy = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const pharmacy = await PharmacyModel.findById(id);
        if (!pharmacy) {
            res.status(404).json({ success: false, error: 'Pharmacy not found' });
            return;
        }
        res.status(200).json({ success: true, data: pharmacy });
    } catch (error: any) {
        console.error("Error fetching pharmacy:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch pharmacy' });
    }
};

export const getAllPharmacies = async (req: Request, res: Response): Promise<void> => {
    try {
        const pharmacies = await PharmacyModel.find();
        res.status(200).json({ success: true, data: pharmacies });
    } catch (error: any) {
        console.error("Error fetching pharmacies:", error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch pharmacies' });
    }
};
