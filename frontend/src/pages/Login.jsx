import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", { email, password });
        const res = axios.post("http://localhost:5000/api/login", { email, password });
        console.log(res.data);
        if (res.data.success) {
            navigate("/dashboard");
        }
    }
    return (
        <div>
            <div>Login</div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">
                    email:
                </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="password">
                    Password:
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
