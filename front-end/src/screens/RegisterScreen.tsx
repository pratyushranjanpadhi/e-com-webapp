import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { register } from "../actions/userAction/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen: React.FC = () => {
   const location = useLocation();
   const history = useHistory();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState<string | null>(null);

   const dispatch = useDispatch();

   const userRegister = useSelector((state: any) => state.userRegister);
   const { loading, error, userInfo } = userRegister;
   const redirect = location.search ? location.search.split("=")[1] : "/";

   useEffect(() => {
      if (userInfo) {
         history.push(redirect);
      }
   }, [userInfo, history, redirect]);

   const submitHandler = (e: any) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setMessage("Password do not match");
      } else {
         dispatch(register(name, email, password));
      }
   };

   return (
      <FormContainer>
         <h1>Register</h1>
         {message && <Message>{message}</Message>}
         {error && <Message>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
               <Form.Label>Password </Form.Label>
               <Form.Control
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
               <Form.Label>Password </Form.Label>
               <Form.Control
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                     setConfirmPassword(e.target.value);
                  }}
               ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
               SIGN IN
            </Button>
         </Form>
         <Row className="py-3">
            <Col>
               Already have an account ?{" "}
               <Link to={redirect ? `/login/?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
         </Row>
      </FormContainer>
   );
};

export default RegisterScreen;
