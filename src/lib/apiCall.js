import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./features/user/userSlice";
import {
  getCartStart,
  getCartSuccess,
  getCartFailure,
} from "./features/cart/cartLengthSlice";
import {
  getNotiStart,
  getNotiSuccess,
  getNotiFailure,
} from "./features/notification/notiSlice";

import axiosInstance from "../config";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getCart = async (dispatch, userId) => {
  dispatch(getCartStart());
  try {
    const res = await axiosInstance.get(`/cart/find/${userId}`);
    dispatch(getCartSuccess(res.data.length));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

export const getNoti = async (dispatch, userId) => {
  dispatch(getNotiStart());
  try {
    const res = await axiosInstance.get(`/home/notification/${userId}`);
    dispatch(getNotiSuccess(res.data));
  } catch (error) {
    dispatch(getNotiFailure());
  }
};
