import mongoose, { Schema } from "mongoose";
import { DoctorGender, IDoctor } from "../types/interface/doctor.interface.js";


const DoctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },


    gender: {
      type: String,
      enum: Object.values(DoctorGender),
      required: true,
    },

    dob: Date,
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    specializations: {
      type: [String],
      default: [],
    },

    qualifications: [
      {
        degree: String,
        institute: String,
        year: Number,
      },
    ],

    experiences: [
      {
        organization: String,
        designation: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: Boolean,
      },
    ],

    consultationFee: {
      online: {
        type: Number,
        default: 0,
      },

      offline: {
        type: Number,
        default: 0,
      },
    },

    languages: {
      type: [String],
      default: [],
    },

    hospitals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],

    clinics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Clinic",
      },
    ],

    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],

    onlineConsultationAvailable: {
      type: Boolean,
      default: false,
    },

    emergencyAvailable: {
      type: Boolean,
      default: false,
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
    },

    bio: String,

    rating: {
      average: {
        type: Number,
        default: 0,
      },

      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const DoctorModel = mongoose.model<IDoctor>(
  "Doctor",
  DoctorSchema
);