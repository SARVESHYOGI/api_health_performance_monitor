import React from 'react'
import { useNavigate } from "react-router-dom";
import api from '../api/api';

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(email, password);
            const res = await api.post("/auth/login", { email, password });
            console.log(res);
            if (res.status === 200) {
                window.location = "/dashboard"
                navigate("/dashboard");
            } else {
                console.log("object");
                alert(res.data.message || "Login failed");
            }
        } catch (error) {
            alert(
                error.response?.data?.message || "Invalid email or password"
            );
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">

                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Sign in to your account
                </p>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    )
}
