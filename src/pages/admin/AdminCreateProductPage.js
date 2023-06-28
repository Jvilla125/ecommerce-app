import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminCreateProductPage = () => {

    const [validated, setValidated] = useState(false); 

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false){ 
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className='btn btn-info my-3'>
                        Go back
                    </Link>
                </Col>
                <Col md={6}>
                    <h1> Create a new product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup className='mb-3' controlId='formBasicName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' required type='text' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='exampleForm.ControlTextarea1'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' required as='textarea' rows={3} />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicCount'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name='count' required type='number' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicPrice'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control name='price' required type='text' />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='formBasicCategory'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select required name="category" aria-label="Default select example">
                                <option value="">Choose Category</option>
                                <option value="1">Laptops</option>
                                <option value="2">TV</option>
                                <option value="3">Games</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup controlId='formFileMultiple' className='mb-3 mt-3'>
                            <Form.Label>Images</Form.Label>
                            <Form.Control required type="file" multiple/>
                        </FormGroup>
                        <Button variant='primary' type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminCreateProductPage;