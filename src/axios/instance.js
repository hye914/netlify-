import axios from "axios";

const instance = axios.create({
  baseURL: "https://dochiapi.shop/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
