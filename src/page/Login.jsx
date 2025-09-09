import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://m-6-backend-flight.onrender.com/api/auth/login', { email, password });
            setAuth({ token: res.data.token, role: res.data.role });
            navigate(res.data.role === 'admin' ? '/manage' : '/flights');
        } catch (err) {
            alert('Login failed');
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: 480 }}>
            <h2>Login</h2>
            <form className="card card-body" onSubmit={handleLogin}>
                <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3"> First Register your account <a href="/register">Register</a></p>
        </div>

    )
}

export default Login