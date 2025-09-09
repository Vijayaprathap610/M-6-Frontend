import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import PrivateRoute from './routes/PrivateRoute';
import Flight from './page/Flight';
import BookingForm from './page/BookingForm';
import ManageBookings from './page/ManageBookings';
import ManageFlight from './page/ManageFlight';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/flight"
          element={
            <PrivateRoute role="passenger">
              <Flight />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookingform"
          element={
            <PrivateRoute role="passenger">
              <BookingForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/managebookings"
          element={
            <PrivateRoute role="admin">
              <ManageBookings />
            </PrivateRoute>
          }
        />
         <Route
          path="/manageflight"
          element={
            <PrivateRoute role="admin">
              <ManageFlight />
            </PrivateRoute>
          }
        />
      </Routes>

    </div>


  )
}

export default App