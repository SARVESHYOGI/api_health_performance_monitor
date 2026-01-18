import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center px-4">

            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    API Health & Performance Monitor
                </h1>

                <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    Monitor your APIs in real-time. Track latency, failures, and performance metrics with clear, aggregated insights to keep your systems healthy.
                </p>

                <div className="mt-8">
                    <button
                        onClick={() => navigate("/login")}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Go to Login
                    </button>
                </div>
            </div>

            <footer className="mt-8 text-gray-500 text-xs sm:text-sm text-center">
                Built with <span className="font-medium">Express.js</span> &{" "}
                <span className="font-medium">React</span> • Observability & Performance Monitoring
            </footer>
        </div>
    );
};

export default Home;
