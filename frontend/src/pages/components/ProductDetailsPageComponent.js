import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap"
import AddedToCartMessageComponent from '../../components/AddedToCartMessageComponent';
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';
import { useParams } from 'react-router-dom';


const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch, getProductDetails }) => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [showCartMessage, setShowCartMessage] = useState(false)
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const addToCartHandler = () => {
        reduxDispatch(addToCartReduxAction(id, quantity));
        setShowCartMessage(true);
    }

    useEffect(() => {
        if (product.images) {
            var options = {
                // width: 400,
                // zoomWidth: 500,
                // fillContainer: true,
                // zoomPosition: "bottom",
                scale: 2,
                offset: { vertical: 0, horizontal: 0 },
            };
            product.images.map((image, id) => new ImageZoom(document.getElementById(`imageId${id + 1}`), options));
        }
        
    });

    useEffect(() => {
        getProductDetails(id)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data));
    }, [])


    return (
        <Container>
            <AddedToCartMessageComponent
                showCartMessage={showCartMessage}
                setShowCartMessage={setShowCartMessage}
            />
            <Row className="mt-5">
                {loading ? (
                    <h2>Loading product details...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
                        <Col style={{ zIndex: 1 }} md={4}>
                            {product.images ? product.images.map((image, id) => (
                                <div key={id}>
                                    <div key={id} id={`imageId${id + 1}`}>
                                        <Image
                                            crossOrigin="anonymous"
                                            fluid
                                            src={`${image.path ?? null}`}
                                        />
                                    </div>
                                        <br />
                                </div>
                            )) : null}
                        </Col >
                        <Col md={8}>
                            <Row>
                                <Col md={8}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h1>{product.name}</h1>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating readonly size={20} initialValue={product.rating} />
                                            ({product.reviewsNumber})
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price <span className="fw-bold">${product.price}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            Status: {product.count > 0 ? " in stock" : "out of stock"}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: <span className="fw-bold">${product.price}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Quantity:
                                            <Form.Select value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                size="lg" aria-label="Default select example">
                                                <option>Choose</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </Form.Select>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button onClick={addToCartHandler} variant="danger">Add to cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-5">
                                    <h5>REVIEWS</h5>
                                    <ListGroup variant="flush">
                                        {Array.from({ length: 10 }).map((item, idx) => (
                                            <ListGroup.Item key={idx}>
                                                John Doe <br />
                                                <Rating readonly size={20} initialValue={4} />
                                                <br />
                                                20-09-2001 <br />
                                                Porta ac consectetur ac Lorem ipsum dolor, sit amet
                                                consectetur adipisicing elit. Perferendis, illo.
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <hr />
                            <Alert variant="danger">Login first to write a review</Alert>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Write a review</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example">
                                    <option>Your rating</option>
                                    <option value="5">5 (very good)</option>
                                    <option value="4">4 (good)</option>
                                    <option value="3">3 (average)</option>
                                    <option value="2">2 (bad)</option>
                                    <option value="1">1 (awful)</option>
                                </Form.Select>
                                <Button className="mb-3 mt-3" variant="primary">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    );
};

export default ProductDetailsPageComponent;