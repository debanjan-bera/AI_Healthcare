import mongoose, { Schema, Document, Types } from "mongoose";
import { BloodGroup, ILocation, IPatient } from "../types/interface/patient.interface.js";

const PatientSchema = new Schema<IPatient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    dob: { type: Date },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    preferredLanguage: {
      type: String,
      required: true,
      default: "en",
    },
    height: {
      value: { type: Number, required: true },
      unit: { type: String, required: true, enum: ["cm", "in"], default: "cm" },
    },
    weight: {
      value: { type: Number, required: true },
      unit: { type: String, required: true, enum: ["kg", "lb"], default: "kg" },
    },

    bloodGroup: {
      type: String,
      enum: Object.values(BloodGroup),
      required: true,
    },

    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    emergencyContact: {
      name: { type: String},
      phone: { type: String },
      relationship: { type: String },
    },

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
    lifestyle: {
      smoking: { type: Boolean, default: false },
      alcohol: { type: Boolean, default: false },
      exercise: { type: String, default: "none" },
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

export const PatientModel = mongoose.model<IPatient>(
  "Patient",
  PatientSchema
);