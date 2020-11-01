import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState(null);

   const dispatch = useDispatch();

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
   const { success } = userProfileUpdate;

   useEffect(() => {
      if (!userInfo) {
         history.push("/login");
      } else {
         if (!user.name) {
            dispatch(getUserDetails("profile"));
         } else {
            setName(user.name);
            setEmail(user.email);
         }
      }
   }, [user, userInfo, history, dispatch]);

   const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setMessage("Password do not match");
      } else {
         dispatch(updateUserProfile({ id: user._id, name, email, password }));
      }
   };

   return (
      <Row>
         <Col md={3}>
            <h2>Update</h2>
            {message && <Message>{message}</Message>}
            {error && <Message>{error}</Message>}
            {success && <Message>Successfully Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
               <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
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
                     value={confirmPassword}
                     onChange={(e) => {
                        setConfirmPassword(e.target.value);
                     }}
                  ></Form.Control>
               </Form.Group>
               <Button type="submit" variant="primary">
                  Update
               </Button>
            </Form>
         </Col>
         <Col md={9}>Order Details</Col>
      </Row>
   );
};

export default ProfileScreen;
