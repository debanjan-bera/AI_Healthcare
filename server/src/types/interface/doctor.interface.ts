import { Document, Types } from "mongoose";

export enum DoctorGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface IQualification {
  degree: string;
  institute: string;
  year?: number;
}

export interface IExperience {
  organization: string;
  designation: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking?: boolean;
}

export interface IConsultationFee {
  online: number;
  offline: number;
}

export interface IAvailability {
  day:
    | "Mon"
    | "Tue"
    | "Wed"
    | "Thu"
    | "Fri"
    | "Sat"
    | "Sun";

  startTime: string;
  endTime: string;
}

export interface IRating {
  average: number;
  totalReviews: number;
}

export interface IVerification {
  status: "pending" | "verified" | "rejected";

  verifiedAt?: Date;

  verifiedBy?: Types.ObjectId;
}

export interface IDoctor extends Document {
  userId: Types.ObjectId;


  gender: DoctorGender;

  dob?: Date;

  location?: Types.ObjectId;

  registrationNumber: string;


  specializations: string[];

  qualifications: IQualification[];

  experiences: IExperience[];

  consultationFee: IConsultationFee;

  languages: string[];

  hospitals: Types.ObjectId[];

  clinics: Types.ObjectId[];


  availability: IAvailability[];

  onlineConsultationAvailable: boolean;

  emergencyAvailable: boolean;

  yearsOfExperience: number;

  bio?: string;

  rating: IRating;


  status: "active" | "inactive" | "suspended";

  createdAt: Date;
  updatedAt: Date;
}