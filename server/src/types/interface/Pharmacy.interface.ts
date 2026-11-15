import { Document, Types } from "mongoose";
export interface IAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

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
