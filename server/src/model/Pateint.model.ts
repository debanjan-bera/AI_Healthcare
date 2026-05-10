import mongoose, { Schema, Document, Types } from "mongoose";
import { BloodGroup, IAddress, IPatient } from "../types/interface/pateint.interface";

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

const PatientSchema = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    age: { type: Number, required: true, min: 0 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: Object.values(BloodGroup),
      required: true,
    },

    height: { type: Number, required: true },
    weight: { type: Number, required: true },

    allergies: {
      type: [String],
      default: [],
    },

    medicalHistory: {
      type: [String],
      default: [],
    },

    currentMedicines: {
      type: [String],
      default: [],
    },

    address: {
      type: AddressSchema,
      required: true,
    },

    preferredLanguage: {
      type: String,
      required: true,
      default: "English",
    },


    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // since you already define createdAt manually
  }
);

/**
 * Model Export
 */
export const PatientModel = mongoose.model<IPatient>(
  "Patient",
  PatientSchema
);