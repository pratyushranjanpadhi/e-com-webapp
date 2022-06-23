import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
   prodcutListReducer,
   productDetailsReducer,
   productDeleteReducer,
   productCreateReducer,
   productUpdateReducer,
   productCreateReviewReducer,
   topRatedProductsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
   createOrderReducer,
   myOrderListReducer,
   orderDetailsReducer,
   orderPayReducer,
   orderDeliverReducer,
   orderListReducer,
} from "./reducers/orderReducers";
import {
   userLoginReducer,
   userRegisterReducer,
   userDetailsReducer,
   userProfileUpdateReducer,
   userListReducer,
   userDeleteReducer,
   userUpdateReducer,
} from "./reducers/userLoginReducers";
import {
   ICartState,
   ICreateOrderState,
   IMyOrderListState,
   IOrderDeliverState,
   IOrderDetailsState,
   IOrderListState,
   IOrderPayState,
   IProductCreateReviewState,
   IProductCreateState,
   IProductDeleteState,
   IProductDetailsState,
   IProductListState,
   IProductUpdateState,
   ITopRatedProductState,
   IUserDeleteState,
   IUserDetailsState,
   IUserListState,
   IUserLoginState,
   IUserProfileUpdateState,
   IUserRegisterState,
   IUserUpdateState,
} from "reducers/types";
import { ICartItem, IShippingAddress, IUserResponseDetails } from "types";

export interface ApplicationState {
   productList?: IProductListState;
   productDetails?: IProductDetailsState;
   productDelete?: IProductDeleteState;
   productCreate?: IProductCreateState;
   productUpdate?: IProductUpdateState;
   productCreateReview?: IProductCreateReviewState;
   topRatedProducts?: ITopRatedProductState;
   cart: ICartState;
   userLogin: IUserLoginState;
   userRegister?: IUserRegisterState;
   userDetails?: IUserDetailsState;
   userProfileUpdate?: IUserProfileUpdateState;
   userList?: IUserListState;
   userDelete?: IUserDeleteState;
   userUpdate?: IUserUpdateState;
   createOrder?: ICreateOrderState;
   orderDetails?: IOrderDetailsState;
   orderPay?: IOrderPayState;
   orderDeliver?: IOrderDeliverState;
   myOrderList?: IMyOrderListState;
   orderList?: IOrderListState;
}

const reducer = combineReducers({
   productList: prodcutListReducer,
   productDetails: productDetailsReducer,
   productDelete: productDeleteReducer,
   productCreate: productCreateReducer,
   productUpdate: productUpdateReducer,
   productCreateReview: productCreateReviewReducer,
   topRatedProducts: topRatedProductsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userProfileUpdate: userProfileUpdateReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   userUpdate: userUpdateReducer,
   createOrder: createOrderReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderDeliver: orderDeliverReducer,
   myOrderList: myOrderListReducer,
   orderList: orderListReducer,
});

const cartItemsFromStorage: ICartItem[] = localStorage.getItem("cartItems")
   ? JSON.parse(localStorage.getItem("cartItems") || "")
   : [];
const userInfoFromStorage: IUserResponseDetails = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo") || "")
   : undefined;
const shippingAddressFromStorage: IShippingAddress = localStorage.getItem("shippingAddress")
   ? JSON.parse(localStorage.getItem("shippingAddress") || "")
   : {
        address: "",
        city: "",
        postalCode: "",
        country: "",
     };

const initialState: ApplicationState = {
   cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
   userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
