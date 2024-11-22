import { axiosInstance } from "./axiosInstance";

const getProperties = async () => {
  const response = await axiosInstance.get(`/api/property`);
  return response.data;
};

const createProperty = async (data: PropertyInput) => {
  const response = await axiosInstance.post(`/api/property`, data);
  return response.data;
};

const updateProperty = async (id: string, data: PropertyData) => {
  const response = await axiosInstance.put(`/api/property/${id}`, data);
  return response.data;
};

const getPropertyById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Property ID is required");
    }

    const response = await axiosInstance.get(`/api/property/${id}`);

    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response data");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch property details"
    );
  }
};

const deleteProperty = async (id: string) => {
  await axiosInstance.delete(`/api/property/${id}`);
};

const getAllPropertyByUser = async () => {
  const response = await axiosInstance.get(`/api/property/me`);
  return response.data;
};

export const propertyApi = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllPropertyByUser,
  getPropertyById
};
