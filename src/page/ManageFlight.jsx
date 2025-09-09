import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

function ManageFlight() {
     const { auth } = useContext(AuthContext);
    const [flights, setFlights] = useState([]);
    const [formData, setFormData] = useState({
        flightNumber: '',
        flightName: '',
        from: '',
        to: '',
        journeyDateTime: new Date()
    });
    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem("token"); 

    // Fetch flights
    useEffect(() => {
        axios.get('http://localhost:3001/api/flight/getflights')
            .then(res => setFlights(res.data))
            .catch(() => alert('Failed to fetch flights'));
    }, []);
    // Handle input changes
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add or Update flight
    const handleSubmit = e => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };

        if (editId) {
            axios.put(`http://localhost:3001/api/flight/putflights/${editId}`, formData, config)
                .then(() => {
                    alert('Flight updated');
                    setEditId(null);
                    refreshFlights();
                })
                .catch(() => alert('Update failed'));
        } else {
            axios.post('http://localhost:3001/api/flight/postflights', formData, config)
                .then(() => {
                    alert('Flight added');
                    refreshFlights();
                })
                .catch(() => alert('Add failed'));
        }

        setFormData({
            flightNumber: '',
            flightName: '',
            from: '',
            to: '',
            journeyDateTime: new Date()
        });
    };

    // Delete flight
    const handleDelete = id => {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };
        axios.delete(`http://localhost:3001/api/flight/removeflights/${id}`, config)
            .then(() => {
                alert('Flight deleted');
                refreshFlights();
            })
            .catch(() => alert('Delete failed'));
    };

    // Edit flight
    const handleEdit = flight => {
        setEditId(flight._id);
        setFormData({
            flightNumber: flight.flightNumber,
            flightName: flight.flightName,
            from: flight.from,
            to: flight.to,
            journeyDateTime: new Date(flight.journeyDateTime).toISOString().slice(0, 16)
        });
    };

    // Refresh flight list
    const refreshFlights = () => {
        axios.get('http://localhost:3001/api/flight/getflights')
            .then(res => setFlights(res.data));
    };







    return (
        <div className="container mt-4">
            <h2 className="mb-4">{editId ? 'Update Flight' : 'Add New Flight'}</h2>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="row g-3">
                    <div className="col-md-2">
                        <input type="text" name="flightNumber" className="form-control" placeholder="Flight No" value={formData.flightNumber} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <input type="text" name="flightName" className="form-control" placeholder="Name" value={formData.flightName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <input type="text" name="from" className="form-control" placeholder="From" value={formData.from} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                        <input type="text" name="to" className="form-control" placeholder="To" value={formData.to} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3">
                        <input type="datetime-local" name="journeyDateTime" className="form-control" value={formData.journeyDateTime} onChange={handleChange} required />
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-primary w-100">{editId ? 'Update' : 'Add'}</button>
                    </div>
                </div>
            </form>

            <h3>Manage Flights</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Flight No</th>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Actions</th>
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
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(f)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(f._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>



    )
}

export default ManageFlight