import jwt from "jsonwebtoken"
import { IUser } from "../types/user.type"
import { JwtPayload } from "../types/auth.interface"

export const createToken = (user: IUser) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    })
}

export const decodeToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
}

export const generateId = () => crypto.randomUUID();