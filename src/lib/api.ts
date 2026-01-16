import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // don't throw error right away
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("sessionToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

