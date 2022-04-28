import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header: React.FC = () => {
   const userLogin = useSelector((state: any) => state.userLogin);
   const { userInfo } = userLogin;
   const dispatch = useDispatch();

   const logoutHandler = () => {
      dispatch(logout());
   };
   return (
      <header>
         <Navbar bg="info" className="py-3" expand="lg">
            <Container>
               <LinkContainer to="/">
                  <Navbar.Brand>ShopOn</Navbar.Brand>
               </LinkContainer>

               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto font-weight-bold">
                     <LinkContainer to="/cart">
                        <Nav.Link>
                           <i className="fas fa-cart-arrow-down mx-2"></i>Cart
                        </Nav.Link>
                     </LinkContainer>
                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id="username">
                           <LinkContainer to="/profile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to="/login">
                           <Nav.Link>
                              <i className="fas fa-user-friends mx-2"></i>Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="username">
                           <LinkContainer to="/admin/userList">
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to="/admin/productList">
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to="/admin/orderList">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
