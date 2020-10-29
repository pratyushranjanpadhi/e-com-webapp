import axios from "axios";
import * as actionTypes from "../actionTypes";

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

export { listProduct, listProductDetails };
