import React, { useState, useEffect } from "react";
import { Image, Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductScreen = ({ match }) => {
   const dispatch = useDispatch();
   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;
   console.log(product);

   useEffect(() => {
      dispatch(listProductDetails(match.params.id));
   }, [dispatch, match]);

   return (
      <>
         <Button href="/" className="bg-primary p-2">
            Go Back
         </Button>
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
                  <ListGroup.Item>
                     <Button className="my-3 btn-block" disabled={product.countInStock === 0}>
                        Add to Cart
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Col>
         </Row>
      </>
   );
};

export default ProductScreen;
