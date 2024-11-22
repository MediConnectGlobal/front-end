import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
});

// Attach token dynamically using an interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
