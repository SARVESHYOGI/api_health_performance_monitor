const apiLogModel = require("../models/apilog.model");

exports.getDashboardData = async (req, res) => {
    try {
        const { endpoint } = req.query;

        if (!endpoint) {
            return res.status(400).json({ message: "endpoint required" });
        }

        const series = await apiLogModel.getTimeSeries(endpoint);

        res.json({
            labels: series.map((s) => s.time),
            avg_response_time: series.map((s) => s.avg_response_time),
            request_count: series.map((s) => s.total_requests),
        });
    } catch (err) {
        console.error("dashboard error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
