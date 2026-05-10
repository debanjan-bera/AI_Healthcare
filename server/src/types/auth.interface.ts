export interface JwtPayload {
    id: string;
    iat: number;
    exp: number
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
