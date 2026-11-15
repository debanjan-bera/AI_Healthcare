import mongoose, { Schema } from "mongoose";
import { IBeds } from "../../types/interface/hospital.interface.js";

const BedSchema = new Schema<IBeds>(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },

    available: {
      type: Number,
      default: 0,
      min: 0,
    },

    icuTotal: {
      type: Number,
      default: 0,
      min: 0,
    },

    icuAvailable: {
      type: Number,
      default: 0,
      min: 0,
    },

    ventilatorTotal: {
      type: Number,
      default: 0,
      min: 0,
    },

    ventilatorAvailable: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
);

export const BedCapacityModel = mongoose.model("BedCapacity", BedSchema);