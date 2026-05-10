import mongoose, { Schema, Document, Types } from "mongoose";
import { IPharmacy } from "../types/interface/Pharmacy.interface";
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
const PharmacySchema = new Schema<IPharmacy>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        pharmacyName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        drugLicenseNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        address: AddressSchema,

        deliveryAvailable: {
            type: Boolean,
            default: false,
        },
        inventoryCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        isVerified: {
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

PharmacySchema.index({ city: 1, deliveryAvailable: 1 });
PharmacySchema.index({ pharmacyName: "text" });

export const PharmacyModel = mongoose.model<IPharmacy>(
    "Pharmacy",
    PharmacySchema
);