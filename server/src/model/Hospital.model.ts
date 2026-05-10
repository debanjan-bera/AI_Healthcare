import mongoose, { Schema, Document, Types } from "mongoose";
import { HospitalType, IHospital } from "../types/interface/hospital.interface";
import { IAddress } from "../types/interface/patient.interface";

const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },
    // 📍 GeoJSON location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },

  { _id: false }
);
const HospitalSchema = new Schema<IHospital>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hospitalName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    hospitalType: {
      type: String,
      enum: Object.values(HospitalType),
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    address: {
      type: AddressSchema,
      required: true,
    },


    departments: {
      type: [String],
      default: [],
    },

    doctorIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],

    staffIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],

    ambulanceAvailable: {
      type: Boolean,
      default: false,
    },

    emergencySupport: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

HospitalSchema.index({ city: 1, hospitalType: 1 });
HospitalSchema.index({ hospitalName: "text" }); // for search

export const HospitalModel = mongoose.model<IHospital>(
  "Hospital",
  HospitalSchema
);