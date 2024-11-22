import { apiClient } from "./config";

export const apiGetAllStaff = async () => apiClient.get("/staff");
export const apiGetSingleStaff = async (id) => apiClient.get(`/staff/${id}`);
export const apiUpdateStaff = async (formData) => apiClient.patch("/staff/me", formData);


