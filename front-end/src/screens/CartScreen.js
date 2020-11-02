import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { Row, Col, ListGroup, Button, Image, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";

function CartScreen({ match, location, history }) {
   const producId = match.params.id;
   const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

   const dispatch = useDispatch();

   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;

   useEffect(() => {
      if (producId) {
         dispatch(addToCart(producId, quantity));
      }
   }, [dispatch, producId, quantity]);

   const removeItemFromCart = (id) => {
      dispatch(removeFromCart(id));
   };

   const checkoutHandler = () => {
      history.push("/login?redirect=shipping");
   };

   return (
      <>
         <Row>
            <Col md={8}>
               <h1>SHOPPING CART</h1>
               {cartItems.length === 0 ? (
                  <Message>
                     Your Cart is empty <Link to="/">Go back</Link>
                  </Message>
               ) : (
                  <ListGroup variant="flush">
                     {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                           <Row>
                              <Col md={2}>
                                 <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col md={3}>
                                 <Link to={`/products/${item.product}`}>{item.name}</Link>
                              </Col>
                              <Col md={2}>$ {item.price}</Col>
                              <Col md={2}>
                                 <Form.Control
                                    as="select"
                                    value={item.quantity}
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                 >
                                    {[...Array(item.countInStock).keys()].map((p) => (
                                       <option key={p + 1} value={p + 1}>
                                          {p + 1}
                                       </option>
                                    ))}
                                 </Form.Control>
                              </Col>
                              <Col md={2}>
                                 <Button
                                    onClick={() => {
                                       removeItemFromCart(item.product);
                                    }}
                                 >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                 </Button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               )}
            </Col>

            <Col md={4}>
               <Card>
                  <ListGroup variant="flush">
                     <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>$
                        {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button className="btn-block" onClick={checkoutHandler}>
                           Proceed to Checkout
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
}

export default CartScreen;
