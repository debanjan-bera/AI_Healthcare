import argon2 from "argon2";
import { UserRole } from "../../types/interface/user.type.js";
import userModel from "../../model/user.model.js";

export const registerService = async (body: any) => {
    const { name, mobile, password } = body;
    const hashedPassword = await argon2.hash(password);

    const newUser = new userModel({ name, mobile, password: hashedPassword });
    await newUser.save();

    return newUser;
}
export const checkExistingUser = async (authUserId: string) => {
    return await userModel.findById(authUserId);
};

export const comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return await argon2.verify(hashedPassword, plainPassword);
}