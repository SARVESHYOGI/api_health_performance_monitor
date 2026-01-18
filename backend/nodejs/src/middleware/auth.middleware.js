import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { payload } = await verifyToken(token);

        req.user = {
            id: payload.userId,
            email: payload.email,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
