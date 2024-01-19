import axios from "axios";

let token;

if (typeof window !== "undefined") {
  if (window.localStorage.getItem("token")) {
    token = `Linh ${window.localStorage.getItem("token")}`;
  }
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  credentials: "include",
  headers: {
    token: token,
  },
});

export default axiosInstance;
