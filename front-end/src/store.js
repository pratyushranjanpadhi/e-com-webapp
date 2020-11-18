import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { prodcutListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { createOrderReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userProfileUpdateReducer } from "./reducers/userLoginReducers";

const reducer = combineReducers({
   productList: prodcutListReducer,
   productDetails: productDetailsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userProfileUpdate: userProfileUpdateReducer,
   createOrder: createOrderReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};

const initialState = {
   cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
   userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
