import React, { useState } from "react";

export default function Dashboard() {
    const [requestUrl, setRequestUrl] = useState("");
    const [requestType, setRequestType] = useState("GET");
    const [headersJson, setHeadersJson] = useState("{}");
    const [bodyJson, setBodyJson] = useState("{}");

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const parseJsonSafe = (jsonString, fieldName) => {
        try {
            return JSON.parse(jsonString || "{}");
        } catch {
            throw new Error(`${fieldName} must be valid JSON`);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        let headers;
        let body;

        try {
            headers = parseJsonSafe(headersJson, "Headers");
            body =
                requestType === "GET" || requestType === "DELETE"
                    ? null
                    : parseJsonSafe(bodyJson, "Body");
        } catch (err) {
            setError(err.message);
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8000/monitor/check-api",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        url: requestUrl,
                        method: requestType,
                        headers: headers,
                        body: body,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Request failed");
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2>API Monitor Dashboard</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <label>Request URL</label>
                    <input
                        type="text"
                        value={requestUrl}
                        onChange={(e) => setRequestUrl(e.target.value)}
                        placeholder="http://localhost:8000/health"
                        required
                    />
                </div>

                <div>
                    <label>Request Method</label>
                    <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>

                <div>
                    <label>Headers (JSON)</label>
                    <textarea
                        rows={5}
                        value={headersJson}
                        onChange={(e) => setHeadersJson(e.target.value)}
                        placeholder='{"Authorization": "Bearer token"}'
                    />
                </div>

                <div>
                    <label>Body (JSON)</label>
                    <textarea
                        rows={6}
                        value={bodyJson}
                        onChange={(e) => setBodyJson(e.target.value)}
                        disabled={
                            requestType === "GET" || requestType === "DELETE"
                        }
                        placeholder='{"name": "test"}'
                    />
                </div>

                <button type="submit">Check API</button>
            </form>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Result</h3>
                    <p>Status Code: {result.status_code}</p>
                    <p>Response Time: {result.response_time_ms} ms</p>
                </div>
            )}

            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    Error: {error}
                </div>
            )}
        </div>
    );
}
