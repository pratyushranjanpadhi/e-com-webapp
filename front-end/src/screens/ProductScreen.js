import React, { useState, useEffect } from "react";
import { Image, ListGroup, Row, Col, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
   const [quantity, setQuantity] = useState(1);

   const dispatch = useDispatch();
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   useEffect(() => {
      dispatch(listProductDetails(match.params.id));
   }, [dispatch, match]);

   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?quantity=${quantity}`);
   };

   return (
      <>
         <Button href="/" className="bg-primary p-2">
            Go Back
         </Button>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message>{error}</Message>
         ) : (
            <Row className="my-3 p-3 ">
               <Col className="sm-col-12">
                  <Image src={product.image} alt={product.name} fluid />
               </Col>
               <Col className="sm-col-3">
                  <ListGroup variant="flush">
                     <ListGroup.Item> {product.name}</ListGroup.Item>
                     <ListGroup.Item>
                        <Rating rating={product.rating} details={`from ${product.numReviews} reviews`} />
                     </ListGroup.Item>
                     <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
               </Col>
               <Col>
                  <ListGroup>
                     <ListGroup.Item>
                        <Row>
                           <Col>Price : </Col>
                           <Col>{product.price}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Status : </Col>
                           <Col>{product.countInStock === 0 ? `Out of Stock` : `Available`}</Col>
                        </Row>
                     </ListGroup.Item>
                     {product.countInStock > 0 && (
                        <ListGroup.Item>
                           <Row>
                              <Col>Quantity : </Col>
                              <Col>
                                 <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((p) => (
                                       <option key={p + 1} value={p + 1}>
                                          {p + 1}
                                       </option>
                                    ))}
                                 </Form.Control>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     )}
                     <ListGroup.Item>
                        <Button className="my-3 btn-block" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                           Add to Cart
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Col>
            </Row>
         )}
      </>
   );
};

export default ProductScreen;
