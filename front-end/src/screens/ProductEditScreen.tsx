import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productAction/productActions";
import * as actionTypes from "../actionTypes";

const ProductEditScreen: React.FC = () => {
   const { id: productId } = useParams<{ id: string }>();
   const history = useHistory();

   const [name, setName] = useState("");
   const [price, setPrice] = useState(0);
   const [image, setImage] = useState("");
   const [brand, setBrand] = useState("");
   const [category, setCategory] = useState("");
   const [countInStock, setCountInStock] = useState(0);
   const [description, setDescription] = useState("");
   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   const productDetails = useSelector((state: any) => state.productDetails);
   const { loading, error, product } = productDetails;

   const productUpdate = useSelector((state: any) => state.productUpdate);
   const { loading: updateLoading, success: updateSuccess, error: updateError } = productUpdate;

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

   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(
         updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
         })
      );
   };

   const uploadFileHandler = async (e: any) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);
      try {
         const config = {
            headers: {
               "Content-type": "multipart/form",
            },
         };
         const { data } = await axios.post("/api/uploads", formData, config);
         setImage(data);
         setUploading(false);
      } catch (error) {
         console.error(error);
         setUploading(true);
      }
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
                        onChange={(e: any) => {
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
                     <Form.File
                        id="image-file"
                        label="Choose Image"
                        custom
                        onChange={uploadFileHandler}
                     ></Form.File>{" "}
                     {uploading && <Loader />}
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
                        onChange={(e: any) => {
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
};

export default ProductEditScreen;
