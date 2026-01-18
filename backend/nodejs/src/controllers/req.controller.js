import axios from "axios";
import { createApiLog, getLast5Requests } from "../models/apiLog.model.js";

export const makeRequest = async (req, res) => {
    const startTime = Date.now();
    try {
        const {
            method,
            url,
            headers = {},
            query_params = {},
            request_body = {},
        } = req.body;

        const response = await axios({
            method: method.toLowerCase(),
            url,
            headers,
            params: query_params,
            data: request_body,
            validateStatus: () => true,
        });

        const responseTime = Date.now() - startTime;

        await createApiLog({
            method,
            url,
            headers,
            query_params,
            request_body,
            user_id: req.user?.id || null,
            user_email: req.user?.email || null,
            ip_address: req.ip,
            user_agent: req.headers["user-agent"],
            request_id: req.headers["x-request-id"] || null,
            status_code: response.status,
            response_body: response.data,
            response_time_ms: responseTime,
        });

        return res.status(response.status).json({
            status: response.status,
            headers: response.headers,
            data: response.data,
            responseTimeMs: responseTime,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to make request",
            error: error.message,
        });
    }
};


export const getAllRequest = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status();
    }
}


export const showAnalytics = async (req, res) => {
    try {
        const analytics = await getLast5Requests();

        return res.status(200).json({
            last_5_requests: analytics,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Analytics failed" });
    }
};
