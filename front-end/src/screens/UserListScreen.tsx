import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userAction/userActions";
import { useHistory } from "react-router-dom";

const UserListScreen: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const userList = useSelector((state: any) => state.userList);
   const { loading, error, users } = userList;
   const userLogin = useSelector((state: any) => state.userLogin);
   const { userInfo } = userLogin;
   const userDelete = useSelector((state: any) => state.userDelete);
   const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = userDelete;

   useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
         dispatch(listUsers());
      } else {
         history.push("/login");
      }
   }, [dispatch, history, userInfo, deleteSuccess]);

   const deleteHandler = (id: any) => {
      if (window.confirm("Are you sure")) {
         dispatch(deleteUser(id));
      }
   };
   return (
      <>
         {deleteLoading && <Loader />}
         {deleteError && <Message>{deleteError}</Message>}
         {loading ? (
            <Loader />
         ) : error ? (
            <Message>{error}</Message>
         ) : (
            <Table striped bordered hover responsive className="table-sm">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>EMAIL</th>
                     <th>ADMIN</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user: any) => (
                     <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                           <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                           {user.isAdmin ? (
                              <i className="fas fa-check" style={{ color: "green" }}></i>
                           ) : (
                              <i className="fas fa-times" style={{ color: "red" }}></i>
                           )}
                        </td>
                        <td>
                           <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <Button variant="light" className="btn-sm">
                                 <i className="fas fa-edit"></i>
                              </Button>
                           </LinkContainer>
                           <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteHandler(user._id)}
                           >
                              <i className="fas fa-trash"></i>
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </>
   );
};

export default UserListScreen;
