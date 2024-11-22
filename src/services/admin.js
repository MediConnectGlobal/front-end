import { apiClient } from "./config";

export const apiGetAllStaff = async () => apiClient.get("/admins");
export const apiGetSingleStaff = async (id) => apiClient.get(`/admins/me/${id}`);
export const apiUpdateAdmin = async (formData) => apiClient.post("/admins/me", formData);


