import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProduct } from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

function HomeScreen() {
   const dispatch = useDispatch();
   const productList = useSelector((state) => state.productList);
   const { loading, error, products } = productList;

   useEffect(() => {
      dispatch(listProduct());
   }, [dispatch]);
   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message message={error} />
         ) : (
            <Row>
               {products.map((product) => (
                  <Col sm={12} md={6} lg={3}>
                     <Product product={product} />
                  </Col>
               ))}
            </Row>
         )}
      </>
   );
}

export default HomeScreen;
