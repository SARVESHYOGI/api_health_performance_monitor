import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => setAuth(res.data.authenticated))
            .catch(() => setAuth(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return (
        <div className="min-h-screen  from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    API Health & Performance Monitor
                </h1>

                <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    Monitor your APIs in real-time. Track latency, failures, and performance metrics with clear, aggregated insights to keep your systems healthy.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    {auth ? (
                        <button
                            onClick={() => navigate("/checker")}
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Check API
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            </div>

            <footer className="mt-12 text-gray-500 text-xs sm:text-sm text-center">
                Built with <span className="font-medium">Express.js</span> &{" "}
                <span className="font-medium">React</span> • Observability & Performance Monitoring
            </footer>
        </div>
    );
};

export default Home;
