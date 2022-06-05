import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userAction/userActions";
import * as actionTypes from "../actionTypes";

interface Props {
   match: any;
   history: any;
}

const UserEditScreen: React.FC<Props> = ({ match, history }) => {
   const userId = match.params.id;
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);

   const dispatch = useDispatch();

   const userDetails = useSelector((state: any) => state.userDetails);
   const { loading, error, user } = userDetails;

   const userUpdate = useSelector((state: any) => state.userUpdate);
   const { loading: updateLoading, success: updateSuccess, error: updateError } = userUpdate;

   useEffect(() => {
      if (updateSuccess) {
         dispatch({ type: actionTypes.USER_UPDATE_RESET });
         history.push("/admin/userList");
      } else {
         if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
         } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
         }
      }
   }, [dispatch, history, user, updateSuccess, userId]);

   const submitHandler = (e: any) => {
      e.preventDefault();
      dispatch(updateUser({ _id: userId, name, email, isAdmin }));
   };

   return (
      <>
         <Link to="/admin/userList" className="btn btn-light my-3 p-2">
            Go Back
         </Link>

         <FormContainer>
            <h1>Edit User</h1>
            {updateLoading && <Loader />}
            {updateError && <Message>{updateError}</Message>}
            {loading ? (
               <Loader />
            ) : error ? (
               <Message>{error}</Message>
            ) : (
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
                  <Form.Group controlId="isadmin">
                     <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={(e) => {
                           setIsAdmin(e.target.checked);
                        }}
                     ></Form.Check>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                     Update
                  </Button>
               </Form>
            )}
         </FormContainer>
      </>
   );
};

export default UserEditScreen;
