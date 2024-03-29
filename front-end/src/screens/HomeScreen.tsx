import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProduct } from "../actions/productAction/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import MyPagination from "../components/MyPagination";
import Slider from "../components/Slider";
import { IProduct } from "types";
import { useParams } from "react-router-dom";

const HomeScreen: React.FC = () => {
   const params = useParams<{ page?: string }>();
   const pageNumber = params.page || "1";
   const dispatch = useDispatch();

   const productList = useSelector((state: any) => state.productList);
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
                  {products.map((product: IProduct) => (
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
};

export default HomeScreen;
