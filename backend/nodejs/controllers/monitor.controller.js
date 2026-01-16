const apiModel = require("../models/apilog.model");

const tryParseJson = (text) => {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

exports.runMonitor = async (req, res) => {
    const {
        endpoint,
        method = "GET",
        headers = {},
        body = null,
        timeout = 5000,
    } = req.body;

    if (!endpoint) {
        return res.status(400).json({ message: "Endpoint is required" });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const startTime = Date.now();

    try {
        const response = await fetch(endpoint, {
            method,
            headers,
            body:
                ["POST", "PUT", "PATCH", "DELETE"].includes(method) && body
                    ? JSON.stringify(body)
                    : undefined,
            signal: controller.signal,
        });

        const responseText = await response.text();
        const responseTime = Date.now() - startTime;
        const responseSize = Buffer.byteLength(responseText, "utf8");

        await apiModel.createLogs({
            endpoint,
            method,
            statusCode: response.status,
            responseTime,
            requestBody:
                ["POST", "PUT", "PATCH", "DELETE"].includes(method) ? body : null,
            userId: req.user?.id || null,
            userEmail: req.user?.email || null,
        });

        res.json({
            success: response.ok,
            status_code: response.status,
            response_time_ms: responseTime,
            response_size_bytes: responseSize,
            headers: Object.fromEntries(response.headers.entries()),
            body: tryParseJson(responseText),
        });
    } catch (err) {
        const responseTime = Date.now() - startTime;

        await apiModel.createLogs({
            endpoint,
            method,
            statusCode: 0,
            responseTime,
            requestBody: body,
            userId: req.user?.id || null,
            userEmail: req.user?.email || null,
        });

        res.status(500).json({
            success: false,
            message:
                err.name === "AbortError"
                    ? "Request timeout"
                    : "Request failed",
            error: err.message,
            response_time_ms: responseTime,
        });
    } finally {
        clearTimeout(timer);
    }
};
