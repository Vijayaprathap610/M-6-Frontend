import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Flight() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/flight/getflights')
            .then(res => setFlights(res.data))
            .catch(() => alert('Failed to fetch flights'));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Available Flights</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Flight No</th>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(f => (
                        <tr key={f._id}>
                            <td>{f.flightNumber}</td>
                            <td>{f.flightName}</td>
                            <td>{f.from}</td>
                            <td>{f.to}</td>
                            <td>{new Date(f.journeyDateTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Flight