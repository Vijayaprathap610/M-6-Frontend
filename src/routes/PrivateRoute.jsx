import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { auth } = useContext(AuthContext);
    return auth.token && auth.role === role ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
