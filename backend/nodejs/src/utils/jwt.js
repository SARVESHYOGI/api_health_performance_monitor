import { SignJWT, jwtVerify } from "jose";
import { configDotenv } from "dotenv";

configDotenv()

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const signToken = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET);
};

export const verifyToken = async (token) => {
    return await jwtVerify(token, SECRET);
};
