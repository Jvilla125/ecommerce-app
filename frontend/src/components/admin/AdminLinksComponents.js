import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../../redux/actions/userActions';
import { useDispatch } from "react-redux"

const AdminLinksComponents = () => {
    const dispatch = useDispatch();

    return (
        <Navbar bg='light' variant='light'>
            <Nav className="flex-column">
                {/* LinkContainer ensures that there is no reloading of the page */}
                <LinkContainer to="/admin/orders">
                    <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                    <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                    <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/chats">
                    <Nav.Link>Chats</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/analytics">
                    <Nav.Link>Analytics</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
};

export default AdminLinksComponents; 