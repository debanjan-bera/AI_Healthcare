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
export interface IAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

/**
 * Patient Interface
 */
export interface IPatient extends Document {
  userId: Types.ObjectId;

  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: BloodGroup;

  height: number; // cm
  weight: number; // kg

  allergies?: string[];
  medicalHistory?: string[];
  currentMedicines?: string[];

  address: IAddress;

  preferredLanguage: string;

  createdAt: Date;
}

