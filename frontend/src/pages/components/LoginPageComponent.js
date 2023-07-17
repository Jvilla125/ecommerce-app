import React, { useState } from 'react';
import { Container, Row, Form, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginPageComponent = ({ loginUserApiRequest }) => {
    const [validated, setValidated] = useState(false);
    // Before the user attempts to login, there will be no success/error message or spinner on the login button
    const [loginUserResponseState, setLoginUserResponseState] = useState({
        success: "",
        error: "",
        loading: false
    });

    const navigate = useNavigate(); // going to use navigate to redirect user to admin or user page
    // depending on if they are admin or not

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements; // event.currentTarget is what is inputted 
        const email = form.email.value;
        const password = form.password.value;
        const doNotLogout = form.doNotLogout.checked;

        // if the following inputs are true then we send the inputs to the api in userController.js
        if (event.currentTarget.checkValidity() === true && email && password) {
            setLoginUserResponseState({ loading: true }) // if login is successful, set loading to true
            loginUserApiRequest(email, password, doNotLogout)
                .then((res) => {
                    setLoginUserResponseState({ success: res.success, loading: false, error: "" })
                    // if user !isAdmin then navigate to user page
                    if (res.success === "user logged in" && !res.userLoggedIn.isAdmin)
                        navigate("/user", { replace: true })
                    // else if user isAdmin navigate to admin page
                    else navigate("/admin/orders", { replace: true })
                })
                .catch((er) => setLoginUserResponseState({
                    error: er.response.data.message ?
                        er.response.data.message : er.response.data
                }));
        }
        setValidated(true);
    };

    return (
        <Container>
            <Row className='mt-5 justify-content-md-center' >
                <Col md={6}>
                    <h1>Login</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                name="doNotLogout"
                                label="Do not logout"
                            />
                        </Form.Group>
                        <Row className='pb-2'>
                            <Col>
                                Don't you have an account?
                                <Link to={"/register"}> Register </Link>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            {loginUserResponseState && loginUserResponseState.loading === true ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                ""
                            )}

                            Login
                        </Button>
                        {/* 'wrong credentials comes from userController.js line 103 */}
                        <Alert show={loginUserResponseState && loginUserResponseState.error === "wrong credentials"}
                            variant='danger'>
                            Wrong credentials
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPageComponent;