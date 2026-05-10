import mongoose from "mongoose";

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

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

/* ---------------- TYPES ---------------- */

type Medicine = {
  name: string;
  dosage: string;
  frequency: string;
};

type Address = {
  street?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Insurance = {
  provider: string;
  policyNumber: string;
};

/* ---------------- INTERFACE ---------------- */

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;

  age?: number;
  gender?: Gender;
  bloodGroup?: BloodGroup;

  height?: number;
  weight?: number;

  allergies?: string[];
  medicalHistory?: string[];
  chronicDiseases?: string[];

  currentMedicines?: Medicine[];

  address: Address;

  preferredLanguage: string;

  insurance?: Insurance;

  isProfileComplete: boolean;

  createdAt: Date;
  updatedAt: Date;
}
