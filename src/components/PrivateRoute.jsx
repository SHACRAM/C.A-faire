import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/Connexion" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
