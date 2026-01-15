import pool from "../db";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("error in register user", error);
    }
}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const userResult = await pool.query("SELECT * FROM users WHERE username= $1", [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("error in login", error);
    }
}