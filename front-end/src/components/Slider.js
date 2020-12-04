import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopRatedProducts } from "../actions/productAction";
const Slider = () => {
   const dispatch = useDispatch();

   const topRatedProducts = useSelector((state) => state.topRatedProducts);
   const { loading, error, products } = topRatedProducts;

   useEffect(() => {
      dispatch(listTopRatedProducts());
   }, [dispatch]);

   return loading ? (
      <Loader />
   ) : error ? (
      <Message>{error}</Message>
   ) : (
      <Carousel pause="hover" className="bg-dark">
         {products.map((product) => (
            <Carousel.Item key={product._id}>
               <Link to={`/products/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption">
                     <h2>
                        {product.name} (${product.price})
                     </h2>
                  </Carousel.Caption>
               </Link>
            </Carousel.Item>
         ))}
      </Carousel>
   );
};

export default Slider;
