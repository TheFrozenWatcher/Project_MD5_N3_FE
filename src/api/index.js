import axios from "axios";
const baseURL = "http://localhost:8080/api/v1/"
const BASE_URL = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const formAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export default BASE_URL;