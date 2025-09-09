import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'passenger', mobilenumber: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://m-6-backend-flight.onrender.com/api/auth/register', form);
            alert('Registered successfully');
            navigate("/login");
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 520 }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="card card-body">
                <input type="text" className="form-control mb-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <select className="form-control mb-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="passenger">Passenger</option>
                    <option value="admin">Admin</option>
                </select>
                <input type="number" className="form-control mb-2" placeholder="Mobilenumber" onChange={(e) => setForm({ ...form, mobilenumber: e.target.value })} />
                <button className="btn btn-success w-100">Register</button>
            </form>
        </div>

    )
}

export default Register