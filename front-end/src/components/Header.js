import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
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
                     <LinkContainer to="/login">
                        <Nav.Link>
                           <i className="fas fa-user-friends mx-2"></i>Sign In
                        </Nav.Link>
                     </LinkContainer>
                     <LinkContainer to="/cart">
                        <Nav.Link>
                           <i className="fas fa-cart-arrow-down mx-2"></i>Cart
                        </Nav.Link>
                     </LinkContainer>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;
