import { apiClient } from "./config";

export const apiGetBookings = async () => apiClient.get("/bookings");


export const apiCreateBooking = async (payload) => apiClient.post("/bookings", payload);


export const apiUpdateBooking = async (bookingId, updatedData) => apiClient.post(`/bookings/${bookingId}`, updatedData);


export const apiGetAllUsers = async (token) => {
  return apiClient.get("/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
};