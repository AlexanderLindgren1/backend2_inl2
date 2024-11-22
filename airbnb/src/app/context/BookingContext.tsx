import { createContext, useContext, useState, ReactNode, use, useEffect } from 'react';
import handleAxiosError from '@/utlis/axiosErrorHandler';
import { bookingApi } from '@/utlis/bookingApi';

const defaultBookingContextState: BookingContextState = {
  bookingsFromUser: [],
  bookings: [],
  currentBooking: null,
  setCurrentBooking: () => {},
  addBooking: async () => {},
  clearBooking: () => {},
  getBooksByUser: async () => {},
  deleteBooking: async(id: string) => {},
};

const BookingContext = createContext<BookingContextState>(defaultBookingContextState);

const validateBookingData = (bookingData: BookingInput): string | null => {
  const { totalPrice, checkingIn, checkingOut, propertyId } = bookingData;

  if (!totalPrice || !checkingIn || !checkingOut || !propertyId) {
    return `All fields are required`;
  }
  const now = new Date();
  const checkInDate = new Date(checkingIn);
  const checkOutDate = new Date(checkingOut);

  if (checkInDate <= now) {
    return "Check-in date must be in the future.";
  }
  if (checkOutDate <= checkInDate) {
    return "Check-out date must be after the check-in date.";
  }

  return null;
};


export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState< Booking| null>(null);
  const [bookingsFromUser, setBookingsFromUser] = useState<Booking[]>([]);

  const addBooking = async (bookingData: BookingInput) => {
    const validationError = validateBookingData(bookingData);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      const newBooking = await bookingApi.createBooking(bookingData);
      setBookings((prev) => [...prev, newBooking]);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const getBooksByUser = async () => {
    try {
      const bookings = await bookingApi.getBooksByUser();
      setBookingsFromUser(bookings);
    } catch (error) { 
      handleAxiosError(error);
    }
  };
  
  const deleteBooking = async (bookingId: string) => {
    try {
      await bookingApi.deleteBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      handleAxiosError(error);
    }
  };


  
  const clearBooking = () => {
    setCurrentBooking(null);
  };

  useEffect(() => {
    if (currentBooking?.user) {
      getBooksByUser();
    }
  }, [currentBooking?.user])

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentBooking,
        setCurrentBooking,
        addBooking,
        clearBooking,
        getBooksByUser,
        deleteBooking,
        bookingsFromUser,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
export const useBookingContext = () => useContext(BookingContext);
