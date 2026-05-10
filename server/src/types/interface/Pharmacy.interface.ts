import { Document, Types } from "mongoose";
import { IAddress } from "./pateint.interface";

export interface IPharmacy extends Document {
  userId: Types.ObjectId;
  pharmacyName: string;
  drugLicenseNumber: string;
  address: IAddress
  deliveryAvailable: boolean;
  inventoryCount: number;
  isVerified: boolean;
  createdAt: Date;
}
