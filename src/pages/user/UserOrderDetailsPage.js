import React from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const UserOrderDetailsPage = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2> Shipping</h2>
                            <b>Name</b>: John Does<br />
                            <b>Address</b>: 8739 Mayflower St. Los Angeles, CA 90063 <br />
                            <b>Phone</b>: 888 777 4444
                        </Col>
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select disabled={false} >
                                <option value="pp">
                                    Paypal
                                </option>
                                <option value="cod">
                                    Cash on Delivery (delivery may be delayed)
                                </option>
                            </Form.Select>
                        </Col>
                        <Row>
                                <Col>
                                    <Alert className='mt-3' variant='danger'>
                                        Not delivered
                                    </Alert>
                                </Col>
                                <Col>
                                    <Alert className='mt-3' variant='success'>
                                        Paid on 2022-10-02
                                    </Alert>
                                </Col>
                            </Row>
                    </Row>
                </Col>
                <Col md={4}>
                    <h3>Order summary</h3>
                </Col>
            </Row>

        </Container>
    )
}

export default UserOrderDetailsPage;