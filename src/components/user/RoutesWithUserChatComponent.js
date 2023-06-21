import React from 'react';
import { Outlet } from 'react-router-dom';
import UserChatComponent from './UserChatComponent';

const RoutesWithUserChatComponent = () => {
    return (
        <>
            <UserChatComponent />
            {/* if user has access to this component, then it will render for user in the UI */}
            <Outlet />
        </>
    )
}

export default RoutesWithUserChatComponent;