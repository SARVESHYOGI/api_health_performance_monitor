const pool = require('../db');
const bcrypt = require('bcrypt');

exports.createUser = async ({ email, password }) => {
    const result = await pool.query(
        "INSERT INTO users (email,password) VALUES ($1,$2,$3) RETURNING *", [email, password]
    );
    return result.rows[0];
}

exports.getUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

exports.getUserById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id=$1", [id]
    )
    return result.rows[0];
}

exports.updateUser = async (id, { name, email }) => {
    const result = await pool.query(
        "UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *", [name, email, id]
    );
    return result.rows[0]
}

exports.deleteUser = async (id) => {
    const result = await pool.query(
        "DELETE FROM users where id=$1", [id]

    )
    return result.rows[0];
}

exports.getUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1", [email]
    )
    return result.rows[0]
}
