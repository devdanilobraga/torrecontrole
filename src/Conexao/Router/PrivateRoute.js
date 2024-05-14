import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const PrivateRoute = ({ element, ...props }) => {
  const { loggedIn } = useAuth(); 

  return loggedIn ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
