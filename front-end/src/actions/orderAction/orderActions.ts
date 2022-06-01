import axios from "axios";
import * as actionTypes from "../../actionTypes";

const createOrder = (order: any) => async (dispatch: any, getState: any) => {
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
   } catch (error: any) {
      dispatch({
         type: actionTypes.CREATE_ORDER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

const getOrderDetails = (id: any) => async (dispatch: any, getState: any) => {
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
   } catch (error: any) {
      dispatch({
         type: actionTypes.PRODUCT_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

const payOrder = (orderId: any, paymentResult: any) => async (dispatch: any, getState: any) => {
   try {
      dispatch({
         type: actionTypes.ORDER_PAY_REQUEST,
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
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
      dispatch({
         type: actionTypes.ORDER_PAY_SUCCESS,
         payload: data,
      });
   } catch (error: any) {
      dispatch({
         type: actionTypes.ORDER_PAY_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

const deliverOrder = (id: any) => async (dispatch: any, getState: any) => {
   try {
      dispatch({
         type: actionTypes.ORDER_DELIVER_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
      dispatch({
         type: actionTypes.ORDER_DELIVER_SUCCESS,
         payload: data,
      });
   } catch (error: any) {
      dispatch({
         type: actionTypes.ORDER_DELIVER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

const listMyOrders = () => async (dispatch: any, getState: any) => {
   try {
      dispatch({
         type: actionTypes.MY_ORDER_LIST_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.get(`/api/orders/myorders`, config);
      dispatch({
         type: actionTypes.MY_ORDER_LIST_SUCCESS,
         payload: data,
      });
   } catch (error: any) {
      dispatch({
         type: actionTypes.MY_ORDER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

const listAllOrders = () => async (dispatch: any, getState: any) => {
   try {
      dispatch({
         type: actionTypes.ORDER_LIST_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.get(`/api/orders`, config);
      dispatch({
         type: actionTypes.ORDER_LIST_SUCCESS,
         payload: data,
      });
   } catch (error: any) {
      dispatch({
         type: actionTypes.ORDER_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export { createOrder, getOrderDetails, payOrder, deliverOrder, listMyOrders, listAllOrders };
