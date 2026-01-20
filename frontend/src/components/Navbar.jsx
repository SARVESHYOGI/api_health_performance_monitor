import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Navbar() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => setAuth(res.data.authenticated))
            .catch(() => setAuth(false));
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            setAuth(false);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            <Link to="/" className="hover:text-blue-600 transition-colors">
                                API Monitor
                            </Link>
                        </h1>
                    </div>

                    {auth && (
                        <div className="hidden md:flex space-x-6">
                            <button
                                onClick={() => navigate("/checker")}
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Checker
                            </button>
                            <button
                                onClick={() => navigate("/pastapi")}
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Past APIs
                            </button>
                            <button
                                onClick={() => navigate("/analytics")}
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Analytics
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-3">
                        {auth ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
