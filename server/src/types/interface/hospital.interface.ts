import { Document, Types } from "mongoose";
import { IAddress } from "./pateint.interface";


export enum HospitalType {
  MULTI_SPECIALITY = "Multi Speciality",
  SINGLE_SPECIALITY = "Single Speciality",
  CLINIC = "Clinic",
  NURSING_HOME = "Nursing Home",
}


export interface IHospital extends Document {
  userId: Types.ObjectId;

  hospitalName: string;
  hospitalType: HospitalType;
  licenseNumber: string;

  address: IAddress;
  departments: string[];

  doctorIds: Types.ObjectId[];
  staffIds: Types.ObjectId[];

  ambulanceAvailable: boolean;
  emergencySupport: boolean;
  isVerified: boolean;
  isAuthorized: boolean;
  createdAt: Date;
}