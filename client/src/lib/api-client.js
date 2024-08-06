import axios from "axios"
import { HOST } from "../utils/constant.js"

const apiClient = axios.create(
    {
        baseURL: HOST,
        withCredentials:true
    }
)

export default apiClient