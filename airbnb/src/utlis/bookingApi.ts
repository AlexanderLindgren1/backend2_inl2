import { axiosInstance } from "./axiosInstance";
import handleAxiosError from "./axiosErrorHandler";

const createBooking = async (bookingData: BookingInput) => {
  try {
    const response = await axiosInstance.post('/api/booking', bookingData);
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};
const getBooksByUser = async () => {
  try {
    const response = await axiosInstance.get(`/api/booking/me`);
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};
const getBookings = async () => {
  try {
    const response = await axiosInstance.get('/api/booking');
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

const getUserBookings = async () => {
  try {
    const response = await axiosInstance.get('/api/booking/me');
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

const updateBooking = async (id: string, bookingData: BookingInput) => {
  try {
    const response = await axiosInstance.put(`/api/booking/${id}`, bookingData);
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

const deleteBooking = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/booking/${id}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
};

export const bookingApi = {
  createBooking,
  getBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
  getBooksByUser
};
