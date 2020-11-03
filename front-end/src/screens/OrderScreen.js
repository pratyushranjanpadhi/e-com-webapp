import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
   const orderId = match.params.id;

   const { order, loading, error } = useSelector((state) => state.orderDetails);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getOrderDetails(orderId));
   }, [dispatch, orderId]);

   return error ? (
      <Message>{error}</Message>
   ) : loading ? (
      <Loader />
   ) : (
      <>
         <Row>
            <Col md={8}>
               <h2>order : {order._id}</h2>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <h3>Shipping Address</h3>
                     <p>
                        <strong>Address : </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                     </p>
                     <p>{order.isDelivered ? <Message>Delivered</Message> : <Message>Not Delivered</Message>}</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h3>Payment Method : </h3>
                     <p>
                        <strong>Method : </strong> {order.paymentMethod}
                     </p>
                     <p>{order.isPaid ? <Message>Paid</Message> : <Message>Not Paid</Message>}</p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h3>Order Details : </h3>
                     {order.orderItems.length === 0 ? (
                        <Message>Your Cart is empty</Message>
                     ) : (
                        <ListGroup variant="flush">
                           {order.orderItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={1}>
                                       <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                       <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                       {item.quantity} X ${item.price} = ${item.quantity * item.price}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     )}
                  </ListGroup.Item>
               </ListGroup>
            </Col>

            <Col md={4}>
               <Card>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h3>Order Summary</h3>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>${order.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>${order.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>${order.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>${order.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default OrderScreen;
