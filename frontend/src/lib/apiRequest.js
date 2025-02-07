import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://plotitude-backend.onrender.com",
  withCredentials: true,
});

export default apiRequest;
