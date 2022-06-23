import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { login } from "../actions/userAction/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen: React.FC = () => {
   const location = useLocation();
   const history = useHistory();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const userLogin = useSelector((state: any) => state.userLogin);
   const { loading, error, userInfo } = userLogin;
   const redirect = location.search ? location.search.split("=")[1] : "/";

   useEffect(() => {
      if (userInfo) {
         history.push(redirect);
      }
   }, [userInfo, history, redirect]);
   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(login(email, password));
   };

   return (
      <FormContainer>
         <h1>Sign In</h1>
         {error && <Message>{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler}>
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
            <Button type="submit" variant="primary">
               SIGN IN
            </Button>
         </Form>
         <Row className="py-3">
            <Col>
               New User?{" "}
               <Link to={redirect ? `/register/?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
         </Row>
      </FormContainer>
   );
};

export default LoginScreen;
