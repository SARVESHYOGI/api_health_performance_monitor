import pool from "../utils/db.js";

export const createApiLog = async (data) => {
  const query = `
    INSERT INTO api_request_logs (
      method,
      url,
      headers,
      query_params,
      request_body,
      user_id,
      user_email,
      ip_address,
      user_agent,
      request_id,
      status_code,
      response_body,
      response_time_ms
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
    )
      RETURNING id
  `;

  const values = [
    data.method,
    data.url,
    JSON.stringify(data.headers),
    JSON.stringify(data.query_params),
    JSON.stringify(data.request_body),
    data.user_id,
    data.user_email,
    data.ip_address,
    data.user_agent,
    data.request_id,
    data.status_code,
    JSON.stringify(data.response_body),
    data.response_time_ms,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllApiLogs = async (userId) => {
  const query = `
    SELECT *
    FROM api_request_logs
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const getLast5Requests = async (userId) => {
  const query = `
    SELECT
      method,
      url,
      status_code,
      response_time_ms,
      created_at
    FROM api_request_logs
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 5
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};