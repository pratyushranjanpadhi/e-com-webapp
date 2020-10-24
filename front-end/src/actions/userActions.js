import axios from "axios";
import * as actionTypes from "../actionTypes";

//login Action
export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: actionTypes.USER_LOGIN_REQUEST,
      });

      const config = {
         headers: {
            "Content-type": "application/json",
         },
      };

      const { data } = await axios.post("/api/users/login/", { email, password }, config);

      dispatch({
         type: actionTypes.USER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: actionTypes.USER_LOGIN_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

//logout Action
export const logout = () => async (dispatch) => {
   dispatch({
      type: actionTypes.USER_LOGOUT,
   });
   localStorage.removeItem("userInfo");
};

//Register Action
export const register = (name, email, password) => async (dispatch) => {
   try {
      dispatch({
         type: actionTypes.USER_REGISTER_REQUEST,
      });

      const config = {
         headers: {
            "Content-type": "application/json",
         },
      };

      const { data } = await axios.post("/api/users", { name, email, password }, config);

      dispatch({
         type: actionTypes.USER_REGISTER_SUCCESS,
         payload: data,
      });

      dispatch({
         type: actionTypes.USER_LOGIN_SUCCESS,
         payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: actionTypes.USER_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};
