const pool = require('../db')

exports.createLogs = async ({ endpoint, method, statusCode, responseTime, requestBody, userId, userEmail }) => {
    const query = `
    INSERT INTO api_request_logs (
    endPoint,method,status_code,response_time_ms,request_body,user_id,user_email
    )
    VALUES($1,$2,$3,$4,$5,$6,$7)
    `;
    const values = [endpoint, method, statusCode, responseTime, requestBody, userId, userEmail];

    await pool.query(query, values);
}

exports.getLogByEndPoint = async (endpoint, limit = 50) => {
    const query = `
        SELECT * 
        FROM api_request_logs
        WHERE endpoint=$1
        ORDER BY created_at DESC
        LIMIT $2
    `;
    const { rows } = await pool.query(query, [endpoint, limit]);
    return rows;
}

exports.getLogsByDateRange = async (endpoint, from, to) => {
    const query = `
    SELECT * FROM api_request_logs
    WHERE endpoint=$1
    AND created_at BETWEEN $2 AND $3
    ORDER BY created_at ASC
    `
    const rows = await pool.query(query, [endpoint, from, to]);
    return rows;
}

exports.getPerformanceStates = async (endpoint) => {

}