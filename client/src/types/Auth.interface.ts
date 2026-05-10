import type { BloodGroupType } from "./Patient.interface";

export type RegisterForm = {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    age: number;
    gender: string;
    bloodGroup: BloodGroupType;
    height?: number;
    weight?: number;
    allergies?: string;
    medicalHistory?: string;
    currentMedicines?: string;
    licenseNumber?: string;
    hospitalName?: string;
    hospitalType?: string;
    pharmacyName?: string;
    deliveryAvailable?: boolean;
    clinicName?: string;
    clinicType?: string;
    specialization?: string;
    experience?: number;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;

};
