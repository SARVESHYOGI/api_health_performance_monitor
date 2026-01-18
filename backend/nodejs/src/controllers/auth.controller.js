import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
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

        const token = signToken({
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
