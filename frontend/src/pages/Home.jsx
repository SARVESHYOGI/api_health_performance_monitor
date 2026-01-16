import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4 leading-tight">
                API Health & Performance Monitor
            </h1>
            <p className="text-gray-600 text-center max-w-2xl sm:max-w-xl md:max-w-2xl mb-8 px-2 sm:px-0 text-sm sm:text-base md:text-lg">
                Monitor your APIs in real-time. Measure latency, failures, and performance metrics, and get aggregated insights to keep your systems healthy.
            </p>

            {/* Button */}
            <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-black font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-colors duration-200 text-sm sm:text-base md:text-lg"
            >
                Go to Login
            </button>

            {/* Optional Footer */}
            <footer className="mt-12 text-gray-500 text-xs sm:text-sm text-center">
                Built with Express.js & React | Observability & Performance Monitoring
            </footer>
        </div>
    );
};

export default Home;
