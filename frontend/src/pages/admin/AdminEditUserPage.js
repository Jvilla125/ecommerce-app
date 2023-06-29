import React, { useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminEditUserPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
    }


    return(
        <Container>
        <Row className="justify-content-md-center mt-5">
            <Col md={1}>
                <Link to="/admin/users" className='btn btn-info my-3'>
                    Go back
                </Link>
            </Col>
            <Col md={6}>
                <h1> Edit User</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FormGroup className='mb-3' controlId='formBasicFirstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control name='name' required type='text' defaultValue='John' />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='formBasicLastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='lastName' required typee='text' defaultValue="Doe" />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='emmail' required type='email' defaultValue="email@email.com" />
                    </FormGroup>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                        <Form.Check name="isAdmin" type="checkbox" label="Is admin"/>
                    </Form.Group>
                    <Button variant='primary' type="submit">
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default AdminEditUserPage;