const apiLogModel = require("../models/apilog.model");

const compare = async (req, res) => {
    try {
        const { endpoint, from, to } = req.query;

        if (!endpoint) {
            return res.status(400).json({ message: "endpoint is required" });
        }

        const performance = await apiLogModel.getPerformanceStats(endpoint);
        const successFailure = await apiLogModel.getSuccessFailureStats(endpoint);
        const percentiles = await apiLogModel.getLatencyPercentiles(endpoint);

        res.json({
            endpoint,
            range: from && to ? { from, to } : "all",
            performance,
            successFailure,
            latency: percentiles,
        });
    } catch (err) {
        console.error("compare error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    compare,
};
