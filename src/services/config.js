import axios from "axios";


const baseUrl = import.meta.env.VITE_BASE_URL;


export const apiClient = axios.create({
    baseURL:baseUrl,

})
console.log('base', baseUrl)


const token = localStorage.getItem("token")

if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}