import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import CartItemComponent from '../../../components/CartItemComponent';

const UserCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal,
    addToCart, removeFromCart, reduxDispatch, userInfo, getUser }) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userAddress, setUserAddress] = useState(false);
    const [missingAddress, setMissingAddress] = useState("");

    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count))
    }

    const removeFromCartHandler = (productID, quantity, price) => {
        if (window.confirm("Are you sure?")) {
            reduxDispatch(removeFromCart(productID, quantity, price))
        }
    }

    useEffect(() => {
        getUser()
            .then((data) => {
                if (!data.address || !data.city || !data.country || !data.zipCode ||
                    !data.state || !data.phoneNumber) {
                    setButtonDisabled(true);
                    setMissingAddress(" In order to make order, fill out your profile with correct address, city, etc.")
                } else {
                    setUserAddress({
                        address: data.address, city: data.city, country:
                            data.country, zipCode: data.zipCode, state: data.state,
                        phoneNumber: data.phoneNumber
                    })
                    setMissingAddress(false);
                }
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.
                message : er.response.data));
    }, [userInfo._id])

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Cart Details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2> Shipping</h2>
                            <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
                            <b>Address</b>: {userAddress.address} {userAddress.city}
                            {userAddress.state} {userAddress.zipCode} <br />
                            <b>Phone</b>: {userAddress.phoneNumber}
                        </Col>
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select >
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
                                    Not delivered.
                                    {missingAddress}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className='mt-3' variant='success'>
                                    Not paid yet
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant='flush'>
                        {cartItems.map((item, idx) => (
                            <CartItemComponent
                                item={item}
                                key={idx}
                                removeFromCartHandler={removeFromCartHandler}
                                changeCount={changeCount}
                            />
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className='fw-bold'>${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-danger'>
                            Total Price: <span className='fw-bold'>${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <div className='d-grid gap-2'>
                                <Button size='lg' variant='danger' type='button' disabled={buttonDisabled}>
                                    Pay for the order
                                </Button>
                            </div>

                        </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>
        </Container>
    )
}

export default UserCartDetailsPageComponent;