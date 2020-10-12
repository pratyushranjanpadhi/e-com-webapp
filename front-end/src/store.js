import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { prodcutListReducer, productDetailsReducer } from "./reducers/productReducers";

const initialState = {};
const reducer = combineReducers({
   productList: prodcutListReducer,
   productDetails: productDetailsReducer,
});
const middleWare = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
