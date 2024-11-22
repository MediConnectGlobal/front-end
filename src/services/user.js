import { apiClient } from "./config";

export const apiGetAllUsers = async () => apiClient.get("/users");
export const apiGetSingleUser = async (id) => apiClient.get(`/users/${id}`);



export const apiUpdateUser = async (formData) => apiClient.patch("users/me", formData);