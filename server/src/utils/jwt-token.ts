import jwt from "jsonwebtoken"
import { JwtPayload } from "../types/auth.interface.js"
import { IUser } from "../types/interface/user.type.js"

export const createToken = (id: string) => {
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET as string, 
        {expiresIn: "1d"})
}

export const decodeToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
}

export const generateId = () => crypto.randomUUID();