import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const persistRoot = localStorage.getItem("persist:root");
const user = persistRoot ? JSON.parse(JSON.parse(persistRoot).user) : null;
const TOKEN = user && user.currentUser ? user.currentUser.accessToken : null;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
