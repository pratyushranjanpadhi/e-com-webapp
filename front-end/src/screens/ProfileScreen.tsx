import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

interface Props {
   location: any;
   history: any;
}

const ProfileScreen: React.FC<Props> = ({ location, history }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState<string | null>(null);

   const dispatch = useDispatch();

   const userDetails = useSelector((state: any) => state.userDetails);
   const { loading, error, user } = userDetails;

   const myOrderList = useSelector((state: any) => state.myOrderList);
   const { loading: orderLoading, error: orderError, orders } = myOrderList;

   const userLogin = useSelector((state: any) => state.userLogin);
   const { userInfo } = userLogin;

   const userProfileUpdate = useSelector((state: any) => state.userProfileUpdate);
   const { success } = userProfileUpdate;

   useEffect(() => {
      if (!userInfo) {
         history.push("/login");
      } else {
         if (!user.name) {
            dispatch(getUserDetails("profile"));
            dispatch(listMyOrders());
         } else {
            setName(user.name);
            setEmail(user.email);
         }
      }
   }, [user, userInfo, history, dispatch]);

   const submitHandler = (e: any) => {
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
         <Col md={9}>
            <h2>My Order Details</h2>
            {orderLoading ? (
               <Loader />
            ) : orderError ? (
               <Message>{orderError}</Message>
            ) : (
               <Table striped bordered hover responsive className="table-sm">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.map((order: any) => (
                        <tr key={order._id}>
                           <td>{order._id}</td>
                           <td>{order.totalPrice}</td>
                           <td>
                              {order.isPaid ? (
                                 order.paidAt.substring(0, 10)
                              ) : (
                                 <i className="fas fa-times" style={{ color: "red" }}></i>
                              )}
                           </td>
                           <td>
                              {order.isDelivered ? (
                                 order.deliveredAt.substring(0, 10)
                              ) : (
                                 <i className="fas fa-times" style={{ color: "red" }}></i>
                              )}
                           </td>
                           <td>
                              <LinkContainer to={`/orders/${order._id}`}>
                                 <Button className="btn-sm" variant="light">
                                    Details
                                 </Button>
                              </LinkContainer>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}
         </Col>
      </Row>
   );
};

export default ProfileScreen;
