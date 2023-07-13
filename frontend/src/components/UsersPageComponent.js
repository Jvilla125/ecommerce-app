import React from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminLinksComponents from '../components/admin/AdminLinksComponents'


const deleteHandler = () => { 
    if(window.confirm("Are you sure?")) alert("User deleted")
}

const UsersPageComponent = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponents />
            </Col>
            <Col md={10}>
                <h1>User List</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>is Admin</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1} </td>
                                <td>Mark </td>
                                <td>Twain</td>
                                <td>Email@email.com</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>
                                    <LinkContainer to="/admin/edit-user">
                                        <Button className='btn-sm'>
                                            <i className='bi bi-pencil-square'></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className='btn-sm' onClick={deleteHandler}>
                                            <i className='bi bi-x-circle' ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default UsersPageComponent;