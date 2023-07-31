import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge, Form, Dropdown, DropdownButton, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import socketIOClient from "socket.io-client";
import { setChatRooms } from '../redux/actions/chatActions';

const HeaderComponent = () => {
    const dispatch = useDispatch();
    // get userInfo from store.js reducer object
    const { userInfo } = useSelector((state) => state.userRegisterLogin);
    // get itemsCount from redux global state
    const itemsCount = useSelector((state) => state.cart.itemsCount);
    const { categories } = useSelector((state) => state.getCategories)

    const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const submitHandler = (e) => {
        if (e.keyCode && e.keyCode !== 13) return;
        e.preventDefault();
        if (searchQuery.trim()) { // trim removes space from the left and write of text
            if (searchCategoryToggle === "All") {
                navigate(`/product-list/search/${searchQuery}`);
            } else {
                navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}/search/${searchQuery}}`)
            }
        } else if (searchCategoryToggle !== "All") {
            navigate(`/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`)
        } else {
            navigate("/product-list");
        }
    }

    // Admin will receive messages that are being sent from the client
    useEffect(() => {
        if (userInfo.isAdmin){
            const socket = socketIOClient();
            socket.on("server sends message from client to admin", ({message}) => {
                dispatch(setChatRooms("exampleUser", message));
            })
        }
    }, [userInfo.isAdmin])

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
                            <DropdownButton id="dropdown-basic-button" title={searchCategoryToggle}>
                                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>All</Dropdown.Item>
                                {categories.map((category, id) => (
                                    <Dropdown.Item key={id} onClick={() => setSearchCategoryToggle(category.name)}>{category.name}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            <Form.Control onKeyUp={submitHandler}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text" placeholder="Search in shop ..." />
                            <Button onClick={submitHandler} variant="warning">
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
                            <NavDropdown
                                title={`${userInfo.name} ${userInfo.lastName}`}
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    eventKey="/user/my-orders"
                                    as={Link}
                                    to="/user/my-orders"
                                >
                                    My orders
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                                    My profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(logout())}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                        <LinkContainer to="/cart">
                            <Nav.Link >
                                <Badge bg="danger">
                                    {itemsCount === 0 ? "" : itemsCount}
                                </Badge>
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