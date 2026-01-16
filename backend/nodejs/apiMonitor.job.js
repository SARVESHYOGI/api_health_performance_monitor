const cron = require("node-cron");
const fetch = require("node-fetch");
const apiLogModel = require("./models/apilog.model");

const MONITORED_APIS = [
    {
        endpoint: "https://api.example.com/orders",
        method: "GET",
    },
];

cron.schedule("*/5 * * * *", async () => {
    for (const api of MONITORED_APIS) {
        const start = Date.now();
        try {
            const res = await fetch(api.endpoint, { method: api.method });
            const time = Date.now() - start;

            await apiLogModel.createLog({
                endpoint: api.endpoint,
                method: api.method,
                statusCode: res.status,
                responseTime: time,
                requestBody: null,
                userId: null,
                userEmail: "system",
            });
        } catch (err) {
            await apiLogModel.createLog({
                endpoint: api.endpoint,
                method: api.method,
                statusCode: 0,
                responseTime: Date.now() - start,
                requestBody: null,
                userId: null,
                userEmail: "system",
            });
        }
    }
});
