import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserChatComponent from './user/UserChatComponent';
import LoginPage from '../pages/LoginPage';
import axios from "axios";


const ProtectedRoutesComponent = ({ admin }) => {
    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        axios.get("/api/get-token").then(function (data){
            if (data.data.token){
                setIsAuth(data.data.token)
            }
            return isAuth;
        })
    }, [isAuth]) // dependency is isAuth

    if (isAuth === undefined) return <LoginPage />

    return isAuth && admin && isAuth !== "admin" ? (
        <Navigate to="/login" />
    ) : isAuth && admin ? (
        <Outlet /> // Outlet allows the paths to be accessible to admin in App.js
    ) : isAuth && !admin ? (
        <>
            <UserChatComponent />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    )

};

export default ProtectedRoutesComponent;