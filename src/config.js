import axios from "axios";

let token;

if (typeof window !== "undefined") {
  if (window.localStorage.getItem("token")) {
    token = `Linh ${window.localStorage.getItem("token")}`;
  }
}

const axiosInstance = axios.create({
  // baseURL: "https://next-shop-backend-delta.vercel.app/api",

  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  credentials: "include",
  headers: {
    token: token,
  },
});

// export const axiosClient = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true,
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default axiosInstance;
