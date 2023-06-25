import React from 'react';
import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap"
import AddedToCartMessageComponent from '../components/AddedToCartMessageComponent';
import { Rating } from 'react-simple-star-rating';

const ProductDetailsPage = () => {
    return (
        <Container>
            <AddedToCartMessageComponent />
            <Row className="mt-5">
                {/* Bootstrap has a total of 12 columns */}
                {/* We are separating the columns into 4 and 8 */}
                <Col md={4}>
                    <Image fluid src="/images/games-category.png" />
                    <Image fluid src="/images/monitors-category.png" />
                    <Image fluid src="/images/tablets-category.png" />
                    <Image fluid src="/images/games-category.png" />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1>Product name</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating readonly size={20} initialValue={4} />(1)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: 
                                    <span className='fw-bold'>
                                        $345
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Example 3
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>
                                    Status: in stock
                                </ListGroup.Item>
                                <ListGroup.Item>Price:
                                    <span className='fw-bold'>
                                        $345
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Quantity: 
                                    <Form.Select size="lg" aria-label="Default select example">
                                        <option>1</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </ListGroup.Item>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Button variant="danger">
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroup>
                            Product Status, quantity
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-5'>
                            <h5>Reviews</h5>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    Example 1
                                </ListGroup.Item>
                                <ListGroup.Item> Example 2</ListGroup.Item>
                                <ListGroup.Item> Example 3</ListGroup.Item>
                                <ListGroup.Item> Example 4</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <hr />
                    send Review Form
                    <Alert variant="danger">Login first to write a review</Alert>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button variant="primary">Primary</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailsPage;