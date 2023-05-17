import { loginFailure, loginStart, loginSuccess } from "./authRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure, getProductStart, getProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";


import {
  getUserFailure, getUserStart, getUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./userRedux";

import {
  getOrderFailure, getOrderStart, getOrderSuccess,
} from "./orderRedux";


import { userActionTypes } from "../redux/user/userActionTypes";

const INITIAL_STATE = {
  currentUser: null,
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data; // return user
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};


//PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    return { success: true };
  } catch (err) {
    dispatch(deleteProductFailure(err.message));
    return { success: false, error: err.message };
  }
};

export const updateProduct = async (id, updatedData, dispatch) => {
  try {
    const res = await userRequest.put(`products/${id}`, updatedData);
    dispatch(updateProductSuccess({ id, product: res.data }));
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Update product error:", err);
    return { success: false, message: err.message };
  }
};



export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


//USERS 

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
    return { success: true };
  } catch (err) {
    dispatch(deleteUserFailure(err.message));
    return { success: false, error: err.message };
  }
};

export const updateUser = async (id, updatedData, dispatch) => {
  try {
    const res = await userRequest.put(`users/${id}`, updatedData);
    dispatch(updateUserSuccess({ id, user: res.data }));
    return { success: true, data: res.data };
  } catch (err) {
    console.error("Update user error:", err);
    return { success: false, message: err.message };
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

//ORDERS
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
