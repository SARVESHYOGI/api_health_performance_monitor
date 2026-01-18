import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-900">
                            API Monitor
                        </h1>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="text-gray-700 hover:text-gray-900 font-medium transition"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate("/pastapi")}
                            className="text-gray-700 hover:text-gray-900 font-medium transition"
                        >
                            Past APIs
                        </button>

                        <button
                            onClick={() => navigate("/analytics")}
                            className="text-gray-700 hover:text-gray-900 font-medium transition"
                        >
                            Past 5 API Analytics
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => navigate("/logout")}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-gray-900">
                            Menu
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
