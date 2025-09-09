import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function BookingForm() {
    const [form, setForm] = useState({
        passengerName: '',
        mobilenumber: '',
        email: '',
        flightNumber: '',
        journeyDate: '',
        from: '',
        to: '',
        totalPassengers: 1
    });
    const { auth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/bookings/postbookings', form, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            alert('Booking submitted');
        } catch {
            alert('Booking failed');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Book a Flight</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        type={key === 'journeyDate' ? 'date' : 'text'}
                        className="form-control mb-2"
                        placeholder={key}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                ))}
                <button className="btn btn-primary">Submit Booking</button>
            </form>
        </div>

    )
}

export default BookingForm