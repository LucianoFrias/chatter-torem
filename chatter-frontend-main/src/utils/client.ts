import axios from "axios";
import baseURL from "./api_base_url";

const apiClient = axios.create({
  // URL para variable de entorno
  baseURL: baseURL
});

export default apiClient;