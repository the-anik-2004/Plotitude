import axios from "axios";

// Create an axios instance
const apiRequest = axios.create({
  baseURL:"http://localhost:8800/api",  // Use the REACT_APP_ prefix
  withCredentials: true,
});

// Add request interceptor
apiRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
