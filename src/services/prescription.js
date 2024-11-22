import { apiClient } from "./config";

export const apiPostPrescription = async (payload) => {
    try {
        const response = await apiClient.post("/prescriptions", payload);
        return response;
    } catch (error) {
        throw error;
    }
};
export const apiGetUserPrescriptions = async (userId) => {
    try {
        const response = await apiClient.get(`/prescriptions/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
export const apiGetAllPrescriptions = async () => {
    try {
        const response = await apiClient.get("/prescriptions");
        return response;
    } catch (error) {
        throw error;
    }
};


 