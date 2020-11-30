import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productAction";
import * as actionTypes from "../actionTypes";

function ProductEditScreen({ match, history }) {
   const productId = match.params.id;

   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [image, setImage] = useState("");
   const [brand, setBrand] = useState("");
   const [category, setCategory] = useState("");
   const [countInStock, setCountInStock] = useState(0);
   const [description, setDescription] = useState("");
   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   const productDetails = useSelector((state) => state.productDetails);
   const { loading, error, product } = productDetails;

   const productUpdate = useSelector((state) => state.productUpdate);
   const { loading: updateLoading, success: updateSuccess, error: updateError } = productUpdate;

   console.log(updateSuccess);

   useEffect(() => {
      if (updateSuccess) {
         dispatch({ type: actionTypes.PRODUCT_UPDATE_RESET });
         history.push("/admin/productList");
      } else {
         if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
         } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
         }
      }
   }, [product, dispatch, productId, history, updateSuccess]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
   };

   return (
      <>
         <Link to="/admin/productList" className="btn btn-light my-3 p-2">
            Go Back
         </Link>

         <FormContainer>
            <h1>Edit Product</h1>
            {updateLoading && <Loader />}
            {updateError && <Message>{updateError}</Message>}
            {loading ? (
               <Loader />
            ) : error ? (
               <Message>{error}</Message>
            ) : (
               <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        placeholder="Enter Name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="price">
                     <Form.Label>Price </Form.Label>
                     <Form.Control
                        placeholder="Enter price"
                        type="number"
                        value={price}
                        onChange={(e) => {
                           setPrice(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="image">
                     <Form.Label>Image </Form.Label>
                     <Form.Control
                        placeholder="Enter image"
                        type="text"
                        value={image}
                        onChange={(e) => {
                           setImage(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="brand">
                     <Form.Label>Brand </Form.Label>
                     <Form.Control
                        placeholder="Enter brand"
                        type="text"
                        value={brand}
                        onChange={(e) => {
                           setBrand(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="category">
                     <Form.Label>Category </Form.Label>
                     <Form.Control
                        placeholder="Enter category"
                        type="text"
                        value={category}
                        onChange={(e) => {
                           setCategory(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="countInStock">
                     <Form.Label>Count In Stock </Form.Label>
                     <Form.Control
                        placeholder="Enter countInStock"
                        type="number"
                        value={countInStock}
                        onChange={(e) => {
                           setCountInStock(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="description">
                     <Form.Label>Description </Form.Label>
                     <Form.Control
                        placeholder="Enter description"
                        type="text"
                        value={description}
                        onChange={(e) => {
                           setDescription(e.target.value);
                        }}
                     ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                     Update
                  </Button>
               </Form>
            )}
         </FormContainer>
      </>
   );
}

export default ProductEditScreen;
