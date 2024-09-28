import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <Route
            {...rest}
            element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
