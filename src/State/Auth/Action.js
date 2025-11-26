import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// ----- Register -----
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  console.log("Registering user:", userData); // 👈 log input

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const { jwt } = response.data;
    console.log("Register Response:", response.data); // 👈 log backend response

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      dispatch(registerSuccess(jwt));
    }
  } catch (error) {
    console.error("Register Error:", error.message); // 👈 log error
    dispatch(registerFailure(error.message));
  }
};

// ----- Login -----
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  console.log("Logging in with:", userData); // 👈 log input

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    console.log("Login Response:", response.data); // 👈 log backend response
    const { jwt } = response.data;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      dispatch(loginSuccess(jwt));
    }
  } catch (error) {
    console.error("Login Error:", error.message); // 👈 log error
    dispatch(loginFailure(error.message));
  }
};

// ----- Get User -----
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  const token = localStorage.getItem("jwt");
  console.log("Fetching user with token:", token); // 👈 log token

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Get User Response:", response.data); // 👈 log backend response
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    console.error("Get User Error:", error.message); // 👈 log error
    dispatch(getUserFailure(error.message));
  }
};

// ----- Logout -----
export const logout = () => (dispatch) => {
  console.log("Logging out"); // 👈 log logout
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
