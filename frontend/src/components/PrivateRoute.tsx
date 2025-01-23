import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import AuthService from '../services/authService';

interface PrivateRouteProps extends RouteProps {
    element: React.ComponentType;
    roles?: string[]; // Cambiamos a opcional con ?
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, roles = [], ...rest }) => {
    const currentUser = AuthService.getCurrentUser();
    
    if (!currentUser || !currentUser.roles) {
        return <Navigate to="/login" />;
    }

    const hasRequiredRole = roles.length === 0 || roles.some(role => currentUser.roles.includes(role));

    return hasRequiredRole ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
