import React, { useState, useEffect } from "react";
import { Image, ListGroup, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { createProductReview, listProductDetails } from "../actions/productAction/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import * as actionTypes from "../actionTypes";

const ProductScreen: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const history = useHistory();
   const [quantity, setQuantity] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   const dispatch = useDispatch();

   const productDetails = useSelector((state: any) => state.productDetails);
   const { loading, error, product } = productDetails;

   const userLogin = useSelector((state: any) => state.userLogin);
   const { userInfo } = userLogin;

   const productCreateReview = useSelector((state: any) => state.productCreateReview);
   const {
      loading: reviewLoading,
      success: reviewSuccess,
      error: reviewError,
   } = productCreateReview;

   useEffect(() => {
      if (reviewSuccess) {
         alert("Review Submitted Successfully");
         setRating(0);
         setComment("");
         dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_RESET });
      }
      dispatch(listProductDetails(id));
   }, [dispatch, id, reviewSuccess]);

   const addToCartHandler = () => {
      history.push(`/cart/${id}?quantity=${quantity}`);
   };

   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(createProductReview(id, { rating, comment }));
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
            <>
               <Row className="my-3 p-3 ">
                  <Col className="sm-col-12">
                     <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col className="sm-col-3">
                     <ListGroup variant="flush">
                        <ListGroup.Item> {product.name}</ListGroup.Item>
                        <ListGroup.Item>
                           <Rating
                              rating={product.rating}
                              details={`from ${product.numReviews} reviews`}
                           />
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
                                    <Form.Control
                                       as="select"
                                       value={quantity}
                                       onChange={(e: any) => setQuantity(e.target.value)}
                                    >
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
                           <Button
                              className="my-3 btn-block"
                              disabled={product.countInStock === 0}
                              onClick={addToCartHandler}
                           >
                              Add to Cart
                           </Button>
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
               </Row>
               <Row>
                  <Col md={6}>
                     <h2>Reviews</h2>
                     {product.review.length === 0 && <Message>No Reviews</Message>}
                     <ListGroup variant="flush">
                        {product.review.map((review: any) => (
                           <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              {/* renamed the prop "values" to "rating" , check again  */}
                              <Rating rating={review.rating} />
                              <p>{review.comment}</p>
                           </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                           <h2>Write a Customer Review</h2>
                           {reviewSuccess && <Message>Review submitted successfully</Message>}
                           {reviewLoading && <Loader />}
                           {reviewError && <Message>{reviewError}</Message>}
                           {userInfo ? (
                              <Form onSubmit={submitHandler}>
                                 <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                       as="select"
                                       value={rating}
                                       onChange={(e: any) => setRating(e.target.value)}
                                    >
                                       <option value="">Select...</option>
                                       <option value="1">1 - Poor</option>
                                       <option value="2">2 - Fair</option>
                                       <option value="3">3 - Good</option>
                                       <option value="4">4 - Very Good</option>
                                       <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                 </Form.Group>
                                 <Form.Group controlId="comment">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                       as="textarea"
                                       // row="3"
                                       value={comment}
                                       onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                 </Form.Group>
                                 <Button disabled={reviewLoading} type="submit" variant="primary">
                                    Submit
                                 </Button>
                              </Form>
                           ) : (
                              <Message>
                                 Please <Link to="/login">sign in</Link> to write a review{" "}
                              </Message>
                           )}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
               </Row>
            </>
         )}
      </>
   );
};

export default ProductScreen;
