import { Request, Response } from "express";
import userModel from "../../model/user.model";
import argon2 from 'argon2';
import { IUser } from "../../types/user.type";
import { createToken } from "../../utils/token";
import { registerService } from "../services/auth.service";
import { AuthRequest } from "../../middleware/authMiddleware";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({
                successful: false,
                message: 'All fields are required!'
            })
        }

        const userExists: IUser | null = await userModel.findOne({ mobile });

        if (!userExists) {
            return res.status(404).json({
                successful: false,
                message: 'User not exists!'
            })
        }
        const verifyPassword = await argon2.verify(userExists.password, password);

        if (!verifyPassword) {
            return res.status(401).json({
                successful: false,
                message: 'Password is incorrect!'
            })
        }
        const token = createToken(userExists);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        return res.json({
            successful: true,
            message: `User with mobile:${mobile} logged in successfully!`,
            user: {
                id: userExists._id,
                name: userExists.name,
                mobile: userExists.mobile,
                email: userExists.email,
                role: userExists.role
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });

    }

}


export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, mobile, password, role } = req.body;
        if (!name || !email || !mobile || !password || !role) {
            return res.status(400).json({
                successful: false,
                message: 'All fields are required!'
            })
        }

        // if (role === 'admin') {
        //     res.status(400).json({
        //         successful: false,
        //         message: 'Admin registration is not allowed!'
        //     })
        // }
        // if (!['patient', 'doctor', 'pharmacy', 'clinic_admin', 'hospital_admin'].includes(role)) {
        //     res.status(400).json({
        //         successful: false,
        //         message: 'Invalid role specified!'
        //     })
        // }

        const userExists = await userModel.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({
                successful: false,
                message: 'User already exists!'
            })
        }
        const newUser = await registerService(req.body);
        const token = createToken(newUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            successful: true,
            token,
            message: 'User registered successfully!',
            user: {
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,
                role: newUser.role
            }
        });

    } catch (error) {
        return res.status(400).json({
            successful: false,
            message: 'Registration failed!',
        });
    }

}


export const me = async (req: AuthRequest, res: Response) => {
    try {
        const user = await userModel.findById(req.user?.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User is verified",
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const logoutController= (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}