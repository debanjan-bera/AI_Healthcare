import mongoose, { Schema } from "mongoose";
import { ILocation } from "../types/interface/patient.interface.js";

const LocationSchema = new Schema<ILocation>(
    {
        address: { type: String, required: true },
        pincode: { type: String, required: true },
        city: { type: String, required: true, index: true },
        state: { type: String, required: true },
        country: { type: String, default: "India" },
        coordinates: {
            latitude: { type: Number, required: false },
            longitude: { type: Number, required: false }
        },
    },
);


export default mongoose.model("Location", LocationSchema);
