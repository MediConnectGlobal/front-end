import { apiClient } from "./config"



export const apiRegisterStaff = async (payload) => {
    return await apiClient.post("/staff/register", payload);
}
export const apiRegisterUser = async (payload) => {
    return await apiClient.post("/users/register", payload);
}
export const apiRegisterAdmin = async (payload) => {
    return await apiClient.post("/admins/register", payload);
}


export const apiLoginUser = async (payload) => {
    return await apiClient.post("/users/login", payload);
}
export const apiLoginStaff = async (payload) => {
    return await apiClient.post("/staff/login", payload);
}
export const apiLoginAdmin = async (payload) => {
    return await apiClient.post("/admins/login", payload);
}