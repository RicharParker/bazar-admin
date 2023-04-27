import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";



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

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: "LOGOUT",
  };
};


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

export const updateProduct = async (id, product, dispatch) => {
  console.log('Updating product with ID:', id);
  console.log('Product data:', product);
  
  dispatch(updateProductStart());
  try {
    const response = await userRequest.put(`/products/${id}`, product);
    console.log('Response:', response); // Add this line to log the response object
    const updatedProduct = response.data;
    console.log('Updated product data:', updatedProduct);
    
    dispatch(updateProductSuccess({ id, product: updatedProduct }));
    return { success: true, product: updatedProduct };
  } catch (err) {
    dispatch(updateProductFailure(err.message));
    return { success: false, error: err.message };
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
