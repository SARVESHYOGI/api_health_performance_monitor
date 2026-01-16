const pool = require("../db");
const bcrypt = require("bcrypt");

exports.createUser = async ({ email, password }) => {
    const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, password]
    );
    return result.rows[0];
};

exports.getUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

exports.getUserById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

exports.updateUser = async (id, { email }) => {
    const result = await pool.query(
        "UPDATE users SET email = $1 WHERE id = $2 RETURNING *",
        [email, id]
    );
    return result.rows[0];
};

exports.deleteUser = async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

exports.getUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};
