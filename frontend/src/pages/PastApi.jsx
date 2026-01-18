import { useEffect, useState } from "react";
import api from "../api/api";

export default function PastApi() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/request/requests");
                setLogs(res.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleOpen = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const formatJson = (data) => {
        if (!data) return "N/A";
        try {
            return JSON.stringify(data, null, 2);
        } catch {
            return String(data);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Past API Requests</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {logs.map((log) => (
                <div
                    key={log.id}
                    className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
                >
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <span className="font-bold mr-2">{log.method}</span>
                            <span className="text-blue-600 font-medium">{log.url}</span>
                        </div>
                        <button
                            onClick={() => toggleOpen(log.id)}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            {openId === log.id ? "Hide Details" : "Show Details"}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <div className="font-semibold">Status</div>
                            <div>{log.status_code}</div>
                        </div>
                        <div>
                            <div className="font-semibold">Response Time</div>
                            <div>{log.response_time_ms} ms</div>
                        </div>
                        <div>
                            <div className="font-semibold">User</div>
                            <div>{log.user_email}</div>
                        </div>
                        <div>
                            <div className="font-semibold">Created</div>
                            <div>{new Date(log.created_at).toLocaleString()}</div>
                        </div>
                    </div>

                    {openId === log.id && (
                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="font-semibold">Headers</div>
                                <pre className="bg-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                                    {formatJson(log.headers)}
                                </pre>
                            </div>

                            <div>
                                <div className="font-semibold">Query Params</div>
                                <pre className="bg-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                                    {formatJson(log.query_params)}
                                </pre>
                            </div>

                            <div>
                                <div className="font-semibold">Path Params</div>
                                <pre className="bg-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                                    {formatJson(log.path_params)}
                                </pre>
                            </div>

                            <div>
                                <div className="font-semibold">Request Body</div>
                                <pre className="bg-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                                    {formatJson(log.request_body)}
                                </pre>
                            </div>

                            <div>
                                <div className="font-semibold">Response Body</div>
                                <pre className="bg-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                                    {formatJson(JSON.parse(log.response_body))}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
