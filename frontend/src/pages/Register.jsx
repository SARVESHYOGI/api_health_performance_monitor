import React from 'react'
import axios from 'axios';

export default function Register() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", { name, email, password });
        const res = axios.post("http://localhost:5000/api/register", { name, email, password });
        console.log(res.data);
    }

    return (
        <div>
            <div>Register</div>
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
