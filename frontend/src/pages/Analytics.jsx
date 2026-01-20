import { useEffect, useState } from "react";
import api from "../api/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Analytics() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/request/analytics/last-5");
                setLogs(res.data.last_5_requests);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const labels = logs.map((log) => log.url);
    const responseTimes = logs.map((log) => log.response_time_ms);

    const data = {
        labels,
        datasets: [
            {
                label: "AVG Response Time (ms)",
                data: responseTimes,
                backgroundColor: "rgba(59, 130, 246, 0.7)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: { size: 14 },
                },
            },
            title: {
                display: true,
                text: "Last 5 API Response Times",
                font: { size: 18, weight: "bold" },
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        ` ${context.dataset.label}: ${context.raw} ms`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Response Time (ms)",
                },
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 15,
                },
            },
        },
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Analytics</h1>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <Bar data={data} options={options} />
                </div>
            )}
        </div>
    );
}
