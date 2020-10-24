import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "react-bootstrap";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
   return (
      <Router>
         <Header />
         <main className="py-3">
            <Container>
               <h1>define the constants and Handle the error properly and after commpletion "delete this phrase"</h1>
               <Route path="/login" component={LoginScreen} />
               <Route path="/register" component={RegisterScreen} />
               <Route path="/" component={HomeScreen} exact />
               <Route path="/products/:id" component={ProductScreen} />
               <Route path="/cart/:id?" component={CartScreen} />
            </Container>
         </main>
         <Footer />
      </Router>
   );
};

export default App;
