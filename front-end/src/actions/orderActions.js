import axios from "axios";
import * as actionTypes from "../actionTypes";

const createOrder = (order) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.CREATE_ORDER_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({
         type: actionTypes.CREATE_ORDER_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.CREATE_ORDER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const getOrderDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.ORDER_DETAILS_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({
         type: actionTypes.ORDER_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.PRODUCT_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.ORDER_PAY_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-type": "applicatin/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
      dispatch({
         type: actionTypes.ORDER_PAY_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.ORDER_PAY_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

export { createOrder, getOrderDetails, payOrder };
