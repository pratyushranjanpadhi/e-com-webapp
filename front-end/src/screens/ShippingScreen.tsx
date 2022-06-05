import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartAction";

interface Props {
   history: any;
}
const ShippingScreen: React.FC<Props> = ({ history }) => {
   const cart = useSelector((state: any) => state.cart);
   const { shippingAddress } = cart;
   const [address, setAddress] = useState(shippingAddress.address);
   const [city, setCity] = useState(shippingAddress.city);
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
   const [country, setCountry] = useState(shippingAddress.country);
   const dispatch = useDispatch();
   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      history.push("/payment");
   };
   return (
      <FormContainer>
         <CheckoutSteps step1 step2 />
         <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
               <Form.Label>Address</Form.Label>
               <Form.Control
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => {
                     setAddress(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
               <Form.Label>City</Form.Label>
               <Form.Control
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => {
                     setCity(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
               <Form.Label>Postal Code</Form.Label>
               <Form.Control
                  placeholder="Enter postal Code"
                  value={postalCode}
                  onChange={(e) => {
                     setPostalCode(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
               <Form.Label>Country</Form.Label>
               <Form.Control
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => {
                     setCountry(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>

            <Button type="submit">Continue</Button>
         </Form>
      </FormContainer>
   );
};

export default ShippingScreen;
