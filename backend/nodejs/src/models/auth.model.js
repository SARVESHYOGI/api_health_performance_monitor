import pool from "../utils/db.js";

export const findUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password, created_at
    FROM users
    WHERE email = $1
  `;
  const values = [email];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const query = `
    SELECT id, email, created_at
    FROM users
    WHERE id = $1
  `;
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const createUser = async (email, password) => {
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;
  const values = [email, password];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateUserPassword = async (id, password) => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE id = $2
    RETURNING id, email
  `;
  const values = [password, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUserById = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
  `;
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0];
};













