import argon2 from "argon2";
import { UserRole } from "../../types/user.type";
import userModel from "../../model/user.model";
import { PatientModel } from "../../model/Patient.model";
import { PharmacyModel } from "../../model/Pharmacy.model";
import { HospitalModel } from "../../model/Hospital.model";

export const registerService = async (body: any) => {
    const { name, email, mobile, password, role } = body;
    const hashedPassword = await argon2.hash(password);

    const newUser = new userModel({ name, email, mobile, password: hashedPassword, role: role.toLowerCase() as UserRole });
    await newUser.save();

    const commonAddress = {
        street: body.street || "N/A",
        city: body.city || "N/A",
        state: body.state || "N/A",
        pincode: body.pincode || "000000",
        country: body.country || "India",
        location: {
            type: "Point" as const,
            coordinates: [parseFloat(body.longitude) || 0, parseFloat(body.latitude) || 0]
        }
    };

    const normalizeArray = (val: any) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return val.split(',').map((s: string) => s.trim());
    };

    if (role.toLowerCase() === 'patient') {
        const patient = new PatientModel({
            userId: newUser._id,
            age: parseInt(body.age) || 0,
            gender: body.gender || "Other",
            bloodGroup: body.bloodGroup || "B+",
            height: parseFloat(body.height) || 0,
            weight: parseFloat(body.weight) || 0,
            allergies: normalizeArray(body.allergies),
            medicalHistory: normalizeArray(body.medicalHistory),
            currentMedicines: normalizeArray(body.currentMedicines),
            address: commonAddress
        });
        await patient.save();
    } else if (role.toLowerCase() === 'pharmacy') {
        const pharmacy = new PharmacyModel({
            userId: newUser._id,
            pharmacyName: body.pharmacyName || body.name,
            drugLicenseNumber: body.licenseNumber || "N/A",
            address: commonAddress,
            deliveryAvailable: body.deliveryAvailable === 'true' || body.deliveryAvailable === true,
        });
        await pharmacy.save();
    } else if (role.toLowerCase() === 'hospital_admin') {
        const hospital = new HospitalModel({
            userId: newUser._id,
            hospitalName: body.hospitalName || body.name,
            hospitalType: body.hospitalType || "Private",
            licenseNumber: body.licenseNumber || "N/A",
            address: commonAddress,
        });
        await hospital.save();
    }

    return newUser;
}