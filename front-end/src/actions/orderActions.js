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

export { createOrder };
