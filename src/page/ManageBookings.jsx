import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

function ManageBookings() {
    const [bookings, setBookings] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3001/api/bookings/managebookings', {
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(res => setBookings(res.data));
    }, [auth]);

    const updateStatus = async (_id, status) => {
        await axios.put(`http://localhost:3001/api/bookings/managebookings/${_id}/status`, { status }, {
            headers: { Authorization: `Bearer ${auth.token}` }
        });
        setBookings(bookings.map(b => b._id === _id ? { ...b, status } : b));
    };


    return (
        <div className="container mt-4">
            <h2>Manage Bookings</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Passenger</th>
                        <th>Flight</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id}>
                            <td>{b.passengerName}</td>
                            <td>{b.flightNumber}</td>
                            <td>{b.status}</td>
                            <td>
                                <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(b._id, 'Approved')}>Approve</button>
                                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b._id, 'Rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageBookings