const pool = require('../db');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/user.model');
const { signToken } = require('../utils/jwt');


const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: "email already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const res = await createUser({ email, hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("error in register user", error);
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(401).json({ message: "password not matched" });
        }
        const token = await signToken({
            id: user.id,
            email: user.email
        })
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: "login successfull" });
    } catch (error) {
        console.log("error in login", error);
    }
}

module.exports = {
    registerUser,
    loginUser
};