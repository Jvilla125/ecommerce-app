import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutesComponent = () => {
    const auth = true;
    return auth ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoutesComponent;