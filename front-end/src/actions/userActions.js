import axios from "axios";
import * as actionTypes from "../actionTypes";

//login Action
const login = (email, password) => async (dispatch) => {
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
const logout = () => async (dispatch) => {
   dispatch({
      type: actionTypes.USER_LOGOUT,
   });
   localStorage.removeItem("userInfo");
};

//Register Action
const register = (name, email, password) => async (dispatch) => {
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

const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.USER_DETAILS_REQUEST,
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

      const { data } = await axios.post(`/api/users/${id}`, config);

      dispatch({
         type: actionTypes.USER_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.USER_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.USER_PROFILE_UPDATE_REQUEST,
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

      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({
         type: actionTypes.USER_PROFILE_UPDATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.USER_PROFILE_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

export { login, logout, register, getUserDetails, updateUserProfile };
