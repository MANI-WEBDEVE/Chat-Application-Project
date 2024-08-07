import axios from "axios"
import { HOST } from "../utils/constant.js"

const apiClient = axios.create({
    baseURL: HOST,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient    