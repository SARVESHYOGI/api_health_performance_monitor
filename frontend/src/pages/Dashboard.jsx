import React, { useState } from "react";
import api from "../api/api";

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
            const response = await api.post("/request/request", {
                method: requestType,
                url: requestUrl,
                headers,
                request_body: body,
                query_params: {},
            });

            setResult(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Request failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    API Monitor Checker
                </h2>

                <form
                    onSubmit={onSubmit}
                    className="bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Request URL
                        </label>
                        <input
                            type="text"
                            value={requestUrl}
                            onChange={(e) => setRequestUrl(e.target.value)}
                            placeholder="http://localhost:8000/health"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Request Method
                        </label>
                        <select
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Headers (JSON)
                        </label>
                        <textarea
                            rows={5}
                            value={headersJson}
                            onChange={(e) => setHeadersJson(e.target.value)}
                            placeholder='{"Authorization": "Bearer token"}'
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Body (JSON)
                        </label>
                        <textarea
                            rows={6}
                            value={bodyJson}
                            onChange={(e) => setBodyJson(e.target.value)}
                            disabled={requestType === "GET" || requestType === "DELETE"}
                            placeholder='{"name": "test"}'
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Check API
                    </button>
                </form>

                {result && (
                    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Result
                        </h3>

                        <p className="text-gray-700">
                            <span className="font-medium">Target URL:</span> {requestUrl}
                        </p>

                        <p className="text-gray-700">
                            <span className="font-medium">Status Code:</span> {result.status}
                        </p>

                        <p className="text-gray-700">
                            <span className="font-medium">Response Time:</span>{" "}
                            {result.averageResponseTimeMs} ms
                        </p>

                        <div className="mt-3">
                            <div className="font-medium text-gray-800 mb-1">
                                Response Body:
                            </div>
                            <pre className="bg-gray-100 rounded-md p-3 text-sm overflow-auto">
                                {JSON.stringify(result.data, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                        Error: {error}
                    </div>
                )}
            </div>
        </div>
    );
}
