import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import * as actionTypes from "../actionTypes";

const OrderScreen = ({ match }) => {
   const orderId = match.params.id;

   const [isSdkReady, setIsSdkReady] = useState(false);

   const { loading: payLoading, success: paySuccess, payError } = useSelector((state) => state.orderPay);

   const { order, loading, error } = useSelector((state) => state.orderDetails);
   const dispatch = useDispatch();

   useEffect(() => {
      const addPaypalScript = async () => {
         const { data: clientId } = await axios.get("/api/config/paypal");
         console.log(clientId);
         const script = document.createElement("script");
         script.type = "text/javascript";
         script.async = true;
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
         script.onload = () => setIsSdkReady(true);
         document.body.appendChild(script);
      };

      if (!order || paySuccess) {
         dispatch({ type: actionTypes.ORDER_PAY_RESET });
         dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
         if (!window.paypal) {
            addPaypalScript();
         } else {
            setIsSdkReady(true);
         }
      }
   }, [dispatch, orderId, order, paySuccess]);

   const paymentSuccessHandler = (paymentResult) => {
      console.log(paymentResult);
      dispatch(payOrder(orderId, paymentResult));
   };

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
                     {!order.isPaid && (
                        <ListGroup.Item>
                           {payLoading && <Loader />}
                           {!isSdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={paymentSuccessHandler} />}
                        </ListGroup.Item>
                     )}
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default OrderScreen;
