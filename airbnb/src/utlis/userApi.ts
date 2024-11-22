import { axiosInstance } from "./axiosInstance";
import handleAxiosError from "./axiosErrorHandler";

interface AuthResponse {
  token: string;
  status?: number;
}

const registerUser = async (user: UserRegister): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/api/user/register", user);
  return response.data;
};

const loginUser = async (user: UserLogin): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/api/user/login", user);

    if (response.status !== 201) {
      throw new Error("Login failed, please try again.");
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

const getUserProperties = async (userId: string): Promise<PropertyRecord[]> => {
  try {
    const response = await axiosInstance.get(`/api/user/${userId}/properties`);
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const userApi = {
  registerUser,
  loginUser,
  getUserProperties,
};
