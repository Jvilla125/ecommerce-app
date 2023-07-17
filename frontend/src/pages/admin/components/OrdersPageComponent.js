import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AdminLinksComponents from '../../../components/admin/AdminLinksComponents';

import { logout } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const OrdersPageComponent = ({ getOrders }) => {
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then((orders) => setOrders(orders))
            .catch(er => dispatch(logout()) )
    }, [])

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponents />
            </Col>
            <Col md={10}>
                <h1>Orders</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Payment method</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1} </td>
                                <td>
                                    {order.user !== null ? (
                                        <>
                                            {order.user.name} {order.user.lastName}
                                        </>
                                    ) : null}
                                </td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.orderTotal.cartSubtotal}</td>
                                <td>
                                    {order.isDelivered ? <i className='bi bi-check-lg'></i>
                                        : <i className='bi bi-x-lg text-danger'></i>}
                                </td>
                                <td>{order.paymentMethod}</td>
                                <td><Link to={`/admin/order-details/${order._id}`}> Go to order</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default OrdersPageComponent;