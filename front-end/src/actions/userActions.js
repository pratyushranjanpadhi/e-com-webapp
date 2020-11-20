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
   localStorage.removeItem("userInfo");
   dispatch({
      type: actionTypes.USER_LOGOUT,
   });
   dispatch({
      type: actionTypes.USER_DETAILS_RESET,
   });
   dispatch({
      type: actionTypes.MY_ORDER_LIST_RESET,
   });
   dispatch({
      type: actionTypes.USER_LIST_RESET,
   });
};

//Register Action
const register = (name, email, password) => async (dispatch) => {
   try {
      dispatch({
         type: actionTypes.USER_REGISTER_REQUEST,
      });
      // using this for authorization : sending the header
      const config = {
         headers: {
            "Content-type": "application/json",
         },
      };
      // sending the data for registration
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

//getting the user details action
const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.USER_DETAILS_REQUEST,
      });
      //we are getting this so that we can have access to the token
      const {
         userLogin: { userInfo },
      } = getState();
      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`, //using the token here
         },
      };
      // getting the details that we will display on clicking the profile menu
      const { data } = await axios.get(`/api/users/${id}`, config);
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

// updating the user details action
const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.USER_PROFILE_UPDATE_REQUEST,
      });
      //we are getting this so that we can have access to the token
      const {
         userLogin: { userInfo },
      } = getState();

      //Using this for authorization : sending the header
      const config = {
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`, //using the token here
         },
      };
      // gettig the details that we will display after we update the profile
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

const listUsers = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: actionTypes.USER_LIST_REQUEST,
      });
      const {
         userLogin: { userInfo },
      } = getState();

      //Using this for authorization : sending the header
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`, //using the token here
         },
      };
      const { data } = await axios.get(`/api/users`, config);
      dispatch({
         type: actionTypes.USER_LIST_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: actionTypes.USER_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
   }
};

export { login, logout, register, getUserDetails, updateUserProfile, listUsers };
