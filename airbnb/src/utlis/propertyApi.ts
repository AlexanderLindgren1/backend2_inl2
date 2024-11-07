import {axiosInstance} from "./axiosInstance";


const getProperties = async () => {
    const response = await axiosInstance.get(`/api/property`);
    return response.data;
};

const getProperty = async (id: string) => {
    const response = await axiosInstance.get(`/api/property/${id}`);
    return response.data;
};

const createProperty = async (data: PropertyInput) => {
    console.log("In propertyAPI data is when create", data);
    
    const response = await axiosInstance.post(`/api/property`, data);
    return response.data;
};

const updateProperty = async (id: string, data: PropertyData) => {
    const response = await axiosInstance.put(`/api/property/${id}`, data);
    return response.data;
};

const deleteProperty = async (id: string) => {
    await axiosInstance.delete(`/api/property/${id}`);
};

export const propertyApi = {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
};
