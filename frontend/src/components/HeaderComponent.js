import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge, Form, Dropdown, DropdownButton, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';


const HeaderComponent = () => {
    const dispatch = useDispatch();
    // get userInfo from store.js reducer object
    const { userInfo } = useSelector(state => state.userRegisterLogin);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                {/* Link container allows user to go to link without reloading the page */}
                <LinkContainer to="/">
                    <Navbar.Brand href="/">Best Online Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <InputGroup>
                            <DropdownButton id="dropdown-basic-button" title="All">
                                <Dropdown.Item >Electronics</Dropdown.Item>
                                <Dropdown.Item >Cars</Dropdown.Item>
                                <Dropdown.Item >Books</Dropdown.Item>

                            </DropdownButton>
                            <Form.Control type="text" placeholder="Search in shop ..." />
                            <Button variant="warning">
                                <i className="bi bi-search text-dark"></i>
                            </Button>
                        </InputGroup>

                    </Nav>
                    <Nav>
                        {userInfo.isAdmin ? (
                            <LinkContainer to="/admin/orders">
                                <Nav.Link >Admin
                                    {/* the span will notify the user if there is a chat available */}
                                    <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                                </Nav.Link>
                            </LinkContainer>
                        ) : userInfo.name && !userInfo.isAdmin ? (
                            <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                                {/* eventKey lets users know that we are currently on that page by highlighting it */}
                                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My orders</NavDropdown.Item>
                                <NavDropdown.Item eventKey="/user/" as={Link} to="/user">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link >
                                        Login
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link >
                                        Register
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                        <LinkContainer to="/cart">
                            <Nav.Link >
                                <Badge bg="danger">2</Badge>
                                <i className="bi bi-cart-dash"></i>
                                <span className='ms-1'> Cart </span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default HeaderComponent;