import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token:charlesonline");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  //posso remover o token aqui se receber 401
  if (error.response && error.response.status === 401) {
    AsyncStorage.removeItem("@token:charlesonline");
  }
  // Handle global errors here
  return Promise.reject(error);
});

export default api;