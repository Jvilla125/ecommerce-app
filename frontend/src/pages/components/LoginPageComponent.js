import React, { useState } from 'react';
import { Container, Row, Form, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPageComponent = ({ loginUserApiRequest }) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        const email = form.email.value;
        const password = form.password.value;
        const doNotLogout = form.doNotLogout.checked;
        if (event.currentTarget.checkValidity() === true && email && password) {
            loginUserApiRequest(email, password, doNotLogout)
            .then((res) => console.log(res))
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data));
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
                                required
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
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Login
                        </Button>
                        <Alert show={true} variant='danger'>
                            Wrong credentials
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPageComponent;