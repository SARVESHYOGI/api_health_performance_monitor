import bcrypt from "bcrypt";
import { signToken, verifyToken } from "../utils/jwt.js";
import { findUserByEmail, createUser } from "../models/auth.model.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(email, hashedPassword);
        if (!user) {
            return res.status(500).json({ message: "Something went wrong" });
        }

        return res.status(201).json({
            message: "Register successful",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in register" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await signToken({
            userId: user.id,
            email: user.email,
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in login" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        })
    }
}

export const me = async (req, res) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                authenticated: false,
                message: "Not authenticated",
            });
        }
        const decoded = verifyToken(token);
        return res.status(200).json({
            authenticated: true,
            user: {
                id: decoded.userId,
                email: decoded.email,
            },
        });

    } catch (error) {
        console.log(error);
        return res.json({
            message: error
        })
    }
}
