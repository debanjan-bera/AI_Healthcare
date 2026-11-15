import mongoose, { Schema } from "mongoose";
import { HospitalType, IContact, IHospital } from "../../types/interface/hospital.interface.js";

const ContactSchema = new Schema<IContact>(
  {
    phones: [
      {
        type: String,
        trim: true,
      },
    ],

    emergencyPhone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
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
    },

    hospitalType: {
      type: String,
      enum: Object.values(HospitalType),
      required: true,
      index: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    establishedYear: Number,

    description: {
      type: String,
      trim: true,
    },

    location: { type: Schema.Types.ObjectId, ref: "Address", required: true },

    contact: ContactSchema,

    departments: [
      {
        name: {
          type: String,
          trim: true,
        },

        description: {
          type: String,
          trim: true,
        },
      },
    ],

    specialties: [
      {
        type: String,
        trim: true,
      },
    ],

    facilities: [
      {
        type: String,
        trim: true,
      },
    ],

    services: [
      {
        type: String,
        trim: true,
      },
    ],

    pharmacyAvailable: {
      type: Boolean,
      default: false,
    },

    bloodBankAvailable: {
      type: Boolean,
      default: false,
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

export const HospitalModel = mongoose.model(
  "Hospital",
  HospitalSchema
);


const helo= {
  "hospitalName": "Apollo Multispeciality Hospital",
  "hospitalType": "multispeciality",
  "registrationNumber": "WB-HOSP-2026-001",

  "establishedYear": 2005,

  "description": "Leading multispeciality hospital providing advanced healthcare services.",

  

  "contact": {
    "phones": [
      "+919876543210",
      "+919876543211"
    ],
    "emergencyPhone": "102",
    "email": "contact@apollohospital.com",
    "website": "https://apollohospital.com"
  },

  "departments": [
    {
      "name": "Cardiology",
      "description": "Heart and cardiovascular treatment"
    },
    {
      "name": "Neurology",
      "description": "Brain and nervous system treatment"
    }
  ],

  "specialties": [
    "Heart Surgery",
    "Neurosurgery",
    "Kidney Transplant"
  ],

  "facilities": [
    "ICU",
    "MRI",
    "CT Scan",
    "Blood Bank",
    "Operation Theatre",
    "Parking"
  ],

  "services": [
    "Emergency Care",
    "Ambulance Service",
    "Health Checkup",
    "Online Consultation"
  ],

  "pharmacyAvailable": true,

  "bloodBankAvailable": true
} 