const pool = require("../db");

exports.createLogs = async ({
    endpoint,
    method,
    statusCode,
    responseTime,
    requestBody,
    userId,
    userEmail,
}) => {
    const query = `
    INSERT INTO api_request_logs (
      endpoint,
      method,
      status_code,
      response_time_ms,
      request_body,
      user_id,
      user_email
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
  `;

    const values = [
        endpoint,
        method,
        statusCode,
        responseTime,
        requestBody,
        userId,
        userEmail,
    ];

    await pool.query(query, values);
};

exports.getLogByEndPoint = async (endpoint, limit = 50) => {
    const query = `
    SELECT *
    FROM api_request_logs
    WHERE endpoint = $1
    ORDER BY created_at DESC
    LIMIT $2
  `;

    const { rows } = await pool.query(query, [endpoint, limit]);
    return rows;
};

exports.getLogsByDateRange = async (endpoint, from, to) => {
    const query = `
    SELECT *
    FROM api_request_logs
    WHERE endpoint = $1
      AND created_at BETWEEN $2 AND $3
    ORDER BY created_at ASC
  `;

    const { rows } = await pool.query(query, [endpoint, from, to]);
    return rows;
};

exports.getPerformanceStats = async (endpoint) => {
    const query = `
    SELECT
      COUNT(*) AS total_requests,
      AVG(response_time_ms)::INT AS avg_response_time,
      MIN(response_time_ms) AS fastest,
      MAX(response_time_ms) AS slowest
    FROM api_request_logs
    WHERE endpoint = $1
  `;

    const { rows } = await pool.query(query, [endpoint]);
    return rows[0];
};

exports.getSuccessFailureStats = async (endpoint) => {
    const query = `
    SELECT
      COUNT(*) FILTER (WHERE status_code BETWEEN 200 AND 299) AS success,
      COUNT(*) FILTER (WHERE status_code >= 400) AS failure
    FROM api_request_logs
    WHERE endpoint = $1
  `;

    const { rows } = await pool.query(query, [endpoint]);
    return rows[0];
};

exports.getLatencyPercentiles = async (endpoint) => {
    const query = `
    SELECT
      percentile_cont(0.95)
        WITHIN GROUP (ORDER BY response_time_ms) AS p95,
      percentile_cont(0.99)
        WITHIN GROUP (ORDER BY response_time_ms) AS p99
    FROM api_request_logs
    WHERE endpoint = $1
  `;

    const { rows } = await pool.query(query, [endpoint]);
    return rows[0];
};

exports.getTimeSeries = async (endpoint) => {
    const query = `
    SELECT
      DATE_TRUNC('hour', created_at) AS time,
      AVG(response_time_ms)::INT AS avg_response_time,
      COUNT(*) AS total_requests
    FROM api_request_logs
    WHERE endpoint = $1
    GROUP BY time
    ORDER BY time
  `;

    const { rows } = await pool.query(query, [endpoint]);
    return rows;
};
