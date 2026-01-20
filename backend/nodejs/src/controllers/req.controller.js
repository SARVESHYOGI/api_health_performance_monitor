import axios from "axios";
import { createApiLog, getLast5Requests, getAllApiLogs } from "../models/apiLog.model.js";

export const makeRequest = async (req, res) => {
    try {
        const {
            method,
            url,
            headers = {},
            query_params = {},
            request_body = {},
        } = req.body;
        if (!method || !url) {
            return res.status(400).json({ message: "method and url are required" });
        }
        const REQUEST_COUNT = 5;
        let totalTime = 0;
        let lastResponse = null;
        for (let i = 0; i < REQUEST_COUNT; i++) {
            const startTime = Date.now();

            const response = await axios({
                method: method.toLowerCase(),
                url,
                headers,
                params: query_params,
                data: request_body,
                validateStatus: () => true,
            });

            const responseTime = Date.now() - startTime;
            totalTime += responseTime;
            lastResponse = response;
        }
        const avgResponseTime = Math.round(totalTime / REQUEST_COUNT);


        await createApiLog({
            method: method.toUpperCase(),
            url,
            headers,
            query_params,
            request_body,
            user_id: req.user?.id || null,
            user_email: req.user?.email || null,
            ip_address: req.ip,
            user_agent: req.headers["user-agent"] || null,
            request_id: req.headers["x-request-id"] || null,
            status_code: lastResponse.status,
            response_body: JSON.stringify(lastResponse.data),
            response_time_ms: avgResponseTime,
        });

        console.log(res);

        return res.status(lastResponse.status).json({
            status: lastResponse.status,
            headers: lastResponse.headers,
            data: lastResponse.data,
            averageResponseTimeMs: avgResponseTime,
            totalRequests: REQUEST_COUNT,
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
        const user = req.user?.id
        const logs = await getAllApiLogs(user);
        return res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        return res.status();
    }
}


export const showAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const analytics = await getLast5Requests(userId);

        return res.status(200).json({
            user_id: userId,
            last_5_requests: analytics,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Analytics failed" });
    }
};
