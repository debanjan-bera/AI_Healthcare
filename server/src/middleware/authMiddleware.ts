import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decodeToken } from "../utils/token";

export interface JwtPayload {
    id: string;
    iat: number;
    exp: number
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found",
            });
        }

        const decoded = decodeToken(token);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}