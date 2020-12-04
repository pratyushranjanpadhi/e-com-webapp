import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProduct } from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import MyPagination from "../components/MyPagination";
import Slider from "../components/Slider";

function HomeScreen({ match }) {
   const pageNumber = match.params.page || 1;
   const dispatch = useDispatch();

   const productList = useSelector((state) => state.productList);
   const { loading, error, products, page, totalPages } = productList;

   useEffect(() => {
      dispatch(listProduct(pageNumber));
   }, [dispatch, pageNumber]);
   return (
      <>
         <Slider />
         <h1>Latest Products</h1>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message>{error}</Message>
         ) : (
            <>
               <Row>
                  {products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <MyPagination page={page} pages={totalPages} />
            </>
         )}
      </>
   );
}

export default HomeScreen;
