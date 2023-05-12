
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
initialState: {
  currentUser: null,
  isFetching: false,
  error: false,
  isLoggedIn: false,
  users: []
},
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error = false;
      state.isLoggedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
        //GET ALL
        getUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
        },
        getUserSuccess: (state, action) => {
          state.isFetching = false;
          state.users = action.payload;
        },
        getUserFailure: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        //DELETE
        deleteUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
        },
        deleteUserSuccess: (state, action) => {
          state.isFetching = false;
          state.users.splice(
            state.users.findIndex((item) => item._id === action.payload),
            1
          );
        },
        deleteUserFailure: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        //UPDATE
        updateUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
        },
    
        updateUserSuccess: (state, action) => {
          const updatedUserIndex = state.users.findIndex(user => user._id === action.payload.id);
          const updatedUsers = [...state.users];
          updatedUsers[updatedUserIndex] = action.payload.user;
          const newState = {
            ...state,
            users: updatedUsers
          };
          return newState;
        },
    
        updateUserFailure: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        //UPDATE
        addUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
        },
        addUserSuccess: (state, action) => {
          state.isFetching = false;
          state.users.push(action.payload);
        },
        addUserFailure: (state) => {
          state.isFetching = false;
          state.error = true;
        },
  },
});

export const { loginStart, loginSuccess, loginFailure,  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure, } = userSlice.actions;
export default userSlice.reducer;
