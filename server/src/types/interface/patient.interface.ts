import { Document, Schema, Types } from "mongoose";

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}
export interface ILocation {
  address: string;
  pincode: string;
  city: string;
  state: string;
  country?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  
}

/**
 * Patient Interface
 */
export interface IPatient extends Document {
  userId: Types.ObjectId;

  dob: Date;
  gender: "Male" | "Female" | "Other";
  preferredLanguage: string;
  bloodGroup: BloodGroup;
  
  height: { value: number; unit: string }; // cm
  weight: { value: number; unit: string }; // kg
  
  location: Types.ObjectId; // Reference to Location collection

  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  allergies?: string[];
  medicalHistory?: string[];
  currentMedicines?: string[];
  lifestyle?: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
  };

  createdAt: Date;
}

