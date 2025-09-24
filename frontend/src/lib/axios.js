import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});


// ---------------------- CSRF TOKEN INTERCEPTOR ----------------------
axiosInstance.interceptors.request.use(async (config) => {
  // Only attach CSRF token for POST, PUT, DELETE requests
  if (["post", "put", "delete"].includes(config.method)) {
    if (!window.csrfToken) {
      // Fetch CSRF token if not already cached
      const res = await axios.get(`${BASE_URL}/csrf-token`, {
        withCredentials: true,
      });
      window.csrfToken = res.data.csrfToken;
    }
    // Attach CSRF token header
    config.headers["X-CSRF-Token"] = window.csrfToken;
  }
  return config;
});


// Optional: Refresh CSRF token if a 403 occurs
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      // Refresh token
      const res = await axios.get(`${BASE_URL}/csrf-token`, {
        withCredentials: true,
      });
      window.csrfToken = res.data.csrfToken;

      // Retry original request
      error.config.headers["X-CSRF-Token"] = window.csrfToken;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

