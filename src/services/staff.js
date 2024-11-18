import { apiClient } from "./config";


export const apiGetAllStaff = async () => apiClient.get("/staff/me");

export const apiGetSingleStaff = async (id) => apiClient.get(`/staff/me/${id}`);


