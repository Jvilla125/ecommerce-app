import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminLinksComponents from '../components/admin/AdminLinksComponents'



// This component will show dynamic user data in /admin/users page 
const UsersPageComponent = ({ fetchUsers, deleteUser }) => {

    const [users, setUsers] = useState([]);
    const [userDeleted, setUserDeleted] = useState(false)

    const deleteHandler = async (userId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteUser(userId)
            if(data === 'User Removed'){
                setUserDeleted(!userDeleted)
            }
        }
    };

    // when a user goes to User page there is a database connection
    // if a user changes their mind and goes to another page,
    // then database connection is aborted 
    useEffect(() => {
        const abctrl = new AbortController();
        fetchUsers(abctrl)
            .then((res) => setUsers(res))
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                )
            );
        return () => abctrl.abort();
    }, [userDeleted]); 
    // useEffect will be invoked if there is a change in state ex: [userDeleted]


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
                        {users.map((user, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1} </td>
                                <td>{user.name} </td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? <i className="bi bi-check-lg text-success"></i>
                                        : <i className="bi bi-x-lg text-danger"></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/edit-user/${user._id}`}>
                                        <Button className='btn-sm'>
                                            <i className='bi bi-pencil-square'></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button variant="danger" className='btn-sm' onClick={() => deleteHandler(user._id)}>
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


//  // Everytime we load the component, useEffect will be called
//     // useEffect is also called when the state of application is changed (endless loop)
//     useEffect(() => {
//         console.log("useEffect called")
//         setCounter(counter + 1);
//         return () => console.log("cleanup the effect"); // return is invoked when leaving the component
//     }, []) // empty array means useEffect will be invoked once after rendering HTML