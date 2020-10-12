import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
   return (
      <Card className="m-3">
         <Link to={`/product/${product._id}`}>
            <Card.Img className="my-3 p-3" src={product.image} variant="top" />
         </Link>

         <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as="div">{product.name}</Card.Title>
            </Link>
            <Card.Text as="h2">${product.price}</Card.Text>
            <Card.Text as="div">
               <Rating rating={product.rating} details={`from ${product.numReviews} reviews`} />
            </Card.Text>
         </Card.Body>
      </Card>
   );
}

export default Product;
