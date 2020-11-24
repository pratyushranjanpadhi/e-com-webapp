import axios from "axios";
import * as actionTypes from "../actionTypes";

// action for getting all the products available
const listProduct = () => async (dispatch) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

// action for getting a single product that we click on
const listProductDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const deleteProduct = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_DELETE_REQUEST });
      const {
         userLogin: { userInfo },
      } = getState();
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      axios.delete(`/api/products/${id}`, config);
      dispatch({ type: actionTypes.PRODUCT_DELETE_SUCCESS });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_DELETE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

export { listProduct, listProductDetails, deleteProduct };
