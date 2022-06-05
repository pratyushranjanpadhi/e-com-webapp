import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";

interface Props {
   history: any;
}

const PaymentScreen: React.FC<Props> = ({ history }) => {
   const cart = useSelector((state: any) => state.cart);
   const { shippingAddress } = cart;
   if (!shippingAddress) {
      history.push("/shipping");
   }
   const [paymentMethod, setPaymentMethod] = useState("PayPal");

   const dispatch = useDispatch();
   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeOrder");
   };
   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as="legend">Select Method</Form.Label>
               <Col>
                  <Form.Check
                     type="radio"
                     label="PayPal or Credit Card"
                     id="PayPal"
                     name="paymentMethod"
                     value="PayPal"
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
               </Col>
            </Form.Group>
            <Button type="submit">Continue</Button>
         </Form>
      </FormContainer>
   );
};

export default PaymentScreen;
