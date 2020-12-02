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

const createProduct = () => async (dispatch, getState) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST });
      const {
         userLogin: { userInfo },
      } = getState();
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.post("/api/products/", {}, config);
      dispatch({ type: actionTypes.PRODUCT_CREATE_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_CREATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const updateProduct = (product) => async (dispatch, getState) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST });
      const {
         userLogin: { userInfo },
      } = getState();
      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put(`/api/products/${product._id}`, product, config);
      dispatch({ type: actionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const createProductReview = (productId, review) => async (dispatch, getState) => {
   try {
      dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST });
      const {
         userLogin: { userInfo },
      } = getState();
      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.post(`/api/products/${productId}/review`, review, config);
      dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

export { listProduct, listProductDetails, deleteProduct, createProduct, updateProduct, createProductReview };
