import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // later change to Render URL after deployment
});

export default api;
