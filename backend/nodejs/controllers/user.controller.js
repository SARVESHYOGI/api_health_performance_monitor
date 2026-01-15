const pool = require('../db');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/user.model');


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
        const res = await createUser()
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
        const userResult = await pool.query("SELECT * FROM users WHERE email= $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("error in login", error);
    }
}

module.exports = {
    registerUser,
    loginUser
};