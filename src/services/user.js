import { apiClient } from "./config";



export const apiGetAllUsers = async () => apiClient.get("/users/me");

export const apiGetSingleUser = async (id) => apiClient.get(`/users/me/${id}`);

export const apiUpdateUser = async () => apiClient.patch("users/me");