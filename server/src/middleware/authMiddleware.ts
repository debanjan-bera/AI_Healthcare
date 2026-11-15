import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt-token.js";
import { AuthRequest } from "../types/auth.interface.js";
 
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