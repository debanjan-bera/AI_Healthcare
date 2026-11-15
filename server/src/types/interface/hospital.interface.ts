import { Types, Document } from "mongoose";
import { ILocation } from "./patient.interface.js";

export enum HospitalType {
  GOVERNMENT = "government",
  PRIVATE = "private",
  CLINIC = "clinic",
  MULTISPECIALITY = "multispeciality",
  SPECIALITY = "speciality",
  DIAGNOSTIC = "diagnostic",
}


export interface IContact {
  phones: string[];
  emergencyPhone?: string;
  email?: string;
  website?: string;
}

export interface IDepartment {
  name: string;
  description?: string;
}

export interface IBeds {
  hospitalId: Types.ObjectId;
  total: number;
  available: number;

  icuTotal: number;
  icuAvailable: number;

  ventilatorTotal: number;
  ventilatorAvailable: number;
}


export interface IOperatingHour {
  day: string;
  open: string;
  close: string;
}

export interface IOperatingHours {
  open24x7: boolean;
  schedule: IOperatingHour[];
}

// export interface IDocumentVerification {
//   documentType: string;
//   documentUrl: string;
//   uploadedAt: Date;
// }

// export interface IVerification {
//   status: "pending" | "verified" | "rejected";

//   verifiedAt?: Date;

//   verifiedBy?: Types.ObjectId;

//   documents: IDocumentVerification[];
// }


export interface IHospital extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  hospitalName: string;

  hospitalType: HospitalType;

  registrationNumber: string;

  establishedYear?: number;

  description?: string;

  location: Types.ObjectId; // Reference to Address collection

  contact: IContact;

  departments: IDepartment[];

  specialties: string[];

  facilities: string[];

  services: string[];

  pharmacyAvailable: boolean;

  bloodBankAvailable: boolean;

  status: "active" | "inactive" | "suspended";

  createdAt: Date;

  updatedAt: Date;
}