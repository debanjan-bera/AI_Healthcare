import { Request, Response } from "express";
import userModel from "../../model/user.model.js";
import { IUser } from "../../types/interface/user.type.js";
import { createToken } from "../../utils/jwt-token.js";
import { comparePassword, registerService } from "../services/auth.service.js";
import { AuthRequest } from "../../types/auth.interface.js";

export class AuthController {
    static async registerController(req: Request, res: Response) {
        try {
            const { name, mobile, password } = req.body;

            if (!name || !mobile || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
            
            const existingUser = await userModel.findOne({ mobile });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }

            const newUser: IUser = await registerService(req.body);
            const token = createToken(newUser._id as string);

            res.cookie("token", token,
                { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });

            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    mobile: newUser.mobile,
                    profileCompleted: newUser.profileCompleted,
                }
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err instanceof Error ? err.message : "Internal server error"
            });
        }
    }
    static async loginController(req: Request, res: Response) {
        try {
            const { mobile, password } = req.body;
            if (!mobile || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Mobile and password are required"
                });
            }
            const user = await userModel.findOne({ mobile });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid mobile or password"
                });
            }
            const verifyPassword = await comparePassword(password, user.password);

            if (!verifyPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid password"
                });
            }
            const token = createToken(user._id as string);

            res.cookie("token", token,
                { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });

            return res.status(201).json({
                success: true,
                message: "User logged in successfully",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    role: user.role,
                    profileCompleted: user.profileCompleted,
                }
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async me(req: AuthRequest, res: Response) {
        try {
            const user = await userModel.findById(req.user?.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.json({
                success: true,
                message: "User details",
                user
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static logoutController = (req: Request, res: Response) => {
        res.clearCookie("token");
        return res.json({
            success: true,
            message: "Logged out"
        });
    }

}

