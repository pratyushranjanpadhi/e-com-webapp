import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {
   const cart = useSelector((state) => state.cart);
   const { cartItems, shippingAddress, paymentMethod } = cart;

   //Price Calculation
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };
   cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
   cart.taxPrice = addDecimals(Number((0.18 * cart.itemsPrice).toFixed(2)));
   cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

   const placeOrderHandler = (e) => {
      e.preventDefault();
      console.log("object");
   };
   return (
      <>
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
            <Col md={8}>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <h2>Shipping Address</h2>
                     <p>
                        <strong>Address : </strong>
                        {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Payment Method : </h2>
                     <strong>Method : </strong> {paymentMethod}
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h2>Order Details : </h2>
                     {cartItems.length === 0 ? (
                        <Message>Your Cart is empty</Message>
                     ) : (
                        <ListGroup variant="flush">
                           {cartItems.map((item, index) => (
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
                        <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>${cart.itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>${cart.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>${cart.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>${cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                           Place Order
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceOrderScreen;
