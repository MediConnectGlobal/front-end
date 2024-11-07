import { apiClient } from "./config"



export const apiRegister = async (payload) => {
    return await apiClient.post("/staff", payload);
}


export const apiLogin = async (payload) => {
    return await apiClient.post("/users/login", payload);
}