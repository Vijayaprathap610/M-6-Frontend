import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';



function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({ token: null, role: null });
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">FlightDeck360</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    {auth.token && auth.role === 'passenger' && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/flight">Flights</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookingform">Book Ticket</Link>
                            </li>
                        </>
                    )}

                    {auth.token && auth.role === 'admin' && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/managebookings">Manage Bookings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manageflight">Manage Flights</Link>
                            </li>
                        </>
                    )}
                </ul>

                <ul className="navbar-nav">
                    {!auth.token ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>



    )
}

export default Navbar