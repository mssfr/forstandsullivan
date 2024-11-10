import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); 
  const isLoggedIn = !!token;
  
  if (!isLoggedIn) {
    return <Navigate to="/404" />;
  }

  return <Component {...rest} />;
};

export function NotFound() {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you're looking for does not exist.</p>
      </div>
    );
  }
  
export default PrivateRoute;