const apiLogModel = require("../models/apilog.model");

exports.getHistory = async (req, res) => {
    const { endpoint, from, to, limit = 50 } = req.query;

    if (!endpoint) {
        return res.status(400).json({ message: "endpoint is required" });
    }

    let logs;

    if (from && to) {
        logs = await apiLogModel.getLogsByDateRange(endpoint, from, to);
    } else {
        logs = await apiLogModel.getLogByEndPoint(endpoint, limit);
    }

    res.json({
        endpoint,
        count: logs.length,
        logs,
    });
};
