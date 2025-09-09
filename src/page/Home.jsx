import React from 'react';
import { Link } from 'react-router-dom';
import "../page/HomePages.css";

function Home() {
    return (
        <><div className="container">
            <div className="shadow-lg p-4 p-md-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-2">
                    <h1 className="display-6">FlightDeck360</h1>
                    <p className="lead mb-0">Search flights, book tickets, and manage approvals with role-based access.</p>
                </div>
            </div>
        </div><div className="hero-section d-flex justify-content-center align-items-center text-center text-white">
                <div className="container">
                    <h1 className="display-4 fw-bold " style={{ color: "green" }}>Welcome to FlightDeck360</h1>
                    <h2 className="display-6 fw-bold">
                        International Flights,International Hotels, and more.
                    </h2>
                    <p className="lead">Millions of cheap flights. One simple search.</p>
                    <form className="row justify-content-center mt-4">
                        <div className="col-md-6">
                            <h3>Up to 30% OFF* on your internationl trips. </h3>
                        </div>
                        <div className="col-auto mt-2 mt-md-0">
                            <Link to={"/register"}>
                                <button type="submit" className="btn btn-success btn-lg">
                                    Register Now
                                </button>
                            </Link>
                        </div>
                        <div className="col-auto mt-2 mt-md-0">
                            <Link to={"/login"}>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Login
                                </button>
                            </Link></div>
                    </form>
                </div>
            </div></>

    )
}

export default Home