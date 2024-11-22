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



export const apiLogoutUser = async (payload) => {
    return await apiClient.post("/users/logout", payload);
}
export const apiLogoutStaff = async (payload) => {
    return await apiClient.post("/staff/logout", payload);
}
export const apiLogoutAdmin = async (payload) => {
    return await apiClient.post("/admins/logout", payload);
}










export const apiGoogleRegister = async (payload) => {
  try {
    const response = await apiClient.post("/auth/google", {
      ...payload,
      callbackUrl: 'https://back-end-4hra.onrender.com/google/callback'
    });
    
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response;
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || "Google registration failed"
    };
  }
};

export const apiGoogleLogin = async (payload) => {
  try {
    const response = await apiClient.post("/auth/google/callback", payload);
    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
    }
    return response;
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || "Google login failed"
    };
  }
};

