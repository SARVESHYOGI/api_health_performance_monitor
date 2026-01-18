import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => {
                setAuth(res.data.authenticated);
            })
            .catch(() => setAuth(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
