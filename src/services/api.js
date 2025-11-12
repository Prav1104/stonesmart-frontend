import axios from "axios";

const api = axios.create({
  baseURL: "https://stonesmart-backend.onrender.com/api", // later change to Render URL after deployment
});

export default api;
