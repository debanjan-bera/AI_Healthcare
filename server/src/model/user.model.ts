import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "../types/user.type";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    mobile: { type: Number, required: true, unique: true  },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);