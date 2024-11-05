import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const getProperties = async () => {
    const response = await axios.get(`${backendUrl}/api/property`);
    return response.data;
};

const getProperty = async (id: string) => {
    const response = await axios.get(`${backendUrl}/api/property/${id}`);
    return response.data;
};

const createProperty = async (data: PropertyInput) => {
    const response = await axios.post(`${backendUrl}/api/property`, data);
    return response.data;
};

const updateProperty = async (id: string, data: PropertyData) => {
    const response = await axios.put(`${backendUrl}/api/property/${id}`, data);
    return response.data;
};

const deleteProperty = async (id: string) => {
    await axios.delete(`${backendUrl}/api/property/${id}`);
};

export const propertyApi = {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
};
