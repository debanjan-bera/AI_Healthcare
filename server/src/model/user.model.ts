import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "../types/interface/user.type.js";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true  },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole)},
    profileCompleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);