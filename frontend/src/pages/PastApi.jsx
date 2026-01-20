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

    const deleteEndPoint = async (id) => {
        if (!window.confirm("Delete this request?")) return;
        try {
            await api.delete(`/request/delete/${id}`);
            setLogs((prev) => prev.filter((log) => log.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Past API Requests
            </h1>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="space-y-4">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <div className="text-sm text-gray-500">
                                    {log.method}
                                </div>
                                <div className="font-medium text-gray-900 break-all">
                                    {log.url}
                                </div>
                            </div>

                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => deleteEndPoint(log.id)}
                                    className="text-sm px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => toggleOpen(log.id)}
                                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                                >
                                    {openId === log.id ? "Hide" : "Details"}
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                                <div className="font-medium text-gray-800">Status</div>
                                {log.status_code}
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">
                                    Response Time
                                </div>
                                {log.response_time_ms} ms
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">User</div>
                                {log.user_email}
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">Created</div>
                                {new Date(log.created_at).toLocaleString()}
                            </div>
                        </div>

                        {openId === log.id && (
                            <div className="mt-4 space-y-4 text-sm">
                                <div>
                                    <div className="font-medium mb-1">Headers</div>
                                    <pre className="bg-gray-100 border rounded p-3 overflow-x-auto text-xs">
                                        {formatJson(log.headers)}
                                    </pre>
                                </div>

                                <div>
                                    <div className="font-medium mb-1">
                                        Request Body
                                    </div>
                                    <pre className="bg-gray-100 border rounded p-3 overflow-x-auto text-xs">
                                        {formatJson(log.request_body)}
                                    </pre>
                                </div>

                                <div>
                                    <div className="font-medium mb-1">
                                        Response Body
                                    </div>
                                    <pre className="bg-gray-100 border rounded p-3 overflow-x-auto text-xs">
                                        {formatJson(
                                            log.response_body &&
                                            JSON.parse(log.response_body)
                                        )}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
