import React, { useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Button, CloseButton, Table, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AdminEditProductPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
    }

    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px", 
        top: "-10px",
        transform: "scale(2.7)",

    }


    return(
        <Container>
        <Row className="justify-content-md-center mt-5">
            <Col md={1}>
                <Link to="/admin/products" className='btn btn-info my-3'>
                    Go back
                </Link>
            </Col>
            <Col md={6}>
                <h1> Edit product</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FormGroup className='mb-3' controlId='formBasicName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' required type='text' defaultValue='Panasonic' />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name='description' required as='textarea' rows={3} defaultValue="Product Description" />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='formBasicCount'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control name='count' required type='number' defaultValue="2" />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='formBasicPrice'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control name='price' required type='text' defaultValue="$210" />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='formBasicCategory'>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Select required name="category" aria-label="Default select example">
                            <option value="">Choose Category</option>
                            <option value="1">Laptops</option>
                            <option value="2">TV</option>
                            <option value="3">Games</option>
                        </Form.Select>
                    </FormGroup>
                    <Row className='mt-5'>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="formBasicAttributes">
                                <Form.Label>Choose attribute and set value</Form.Label>
                                <Form.Select name="atrrKey" aria-label="Default select example">
                                    <option>Choose attribute</option>
                                    <option value="red">color</option>
                                </Form.Select>
                            </Form.Group>
                        </Col >
                        <Col md={6}>
                        <Form.Group className='mb-3' controlId="formBasicAttributeValue">
                                <Form.Label>Attribute value</Form.Label>
                                <Form.Select name="atrrKey" aria-label="Default select example">
                                    <option>Choose attribute value</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Attribute</th>
                                    <th>Value</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>attr key</td>
                                    <td>atrr value</td>
                                    <td><CloseButton/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="formBasicNewAttribute">
                                <Form.Label> Create new attribute </Form.Label>
                                    <Form.Control
                                    disabled={false}
                                    placeholder='first choose or create category'
                                    name='newAttrValue'
                                    type='text'
                                    />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group className='mb-3' controlId="formBasicNewAttributeValue">
                                <Form.Label> Attribute value</Form.Label>
                                    <Form.Control
                                    disabled={false}
                                    required={true}
                                    placeholder='first choose or create category'
                                    name='newAttrValue'
                                    type='text'
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Alert variant='primary'>
                        After typing attribute key and value press enter on one of the field
                    </Alert>
                    <FormGroup controlId='formFileMultiple' className='mb-3 mt-3'>
                        <Form.Label>Images</Form.Label>
                        <Row>
                            <Col style={{position: "relative"}} xs={3}>
                                <Image crossOrigin="anonymous" src="/images/monitors-category.png" fluid/>
                                <i style={onHover} className='bi bi-x text-danger'></i>
                            </Col>
                            <Col style={{position: "relative"}} xs={3}>
                                <Image src="/images/monitors-category.png" fluid/>
                                <i style={onHover} className='bi bi-x text-danger'></i>
                            </Col>
                            
                        </Row>
                        <Form.Control required type="file" multiple />
                    </FormGroup>
                    <Button variant='primary' type="submit">
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default AdminEditProductPage;