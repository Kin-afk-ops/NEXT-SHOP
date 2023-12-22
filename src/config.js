import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://btl-backend.vercel.app/api",
});

export default axiosInstance;
