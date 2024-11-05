type PropertyRecord = {
  id: string;
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  availableFrom: boolean;
  bookings: Booking;
};

type PropertyData = {
  id: string;
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  availableFrom: boolean;
  bookings: Booking;
};

type PropertyInput = {
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  availableFrom: boolean;
  bookings: Booking;
};
type PropertyFormProps = {
  selectedProperty?: PropertyRecord | null; // Allow null
};
