import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const api = axios.create({
  baseURL: process.env.apiUrl,
  // timeout: 1000,
})
export default api