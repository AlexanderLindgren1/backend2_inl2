type Property = {
  name: string;           // Name of the property
  description: string;    // Description of the property
  place: string;          // Location of the property
  pricePerNight: number;  // Price per night for booking
  availableFrom: boolean;    // Date when the property becomes available
  bookings?: Booking[];   // Optional: List of bookings associated with the property
};
type PropertyRecord = {
  id: string
  name: string;           // Name of the property
  description: string;    // Description of the property
  place: string;          // Location of the property
  pricePerNight: number;  // Price per night for booking
  availableFrom: boolean;    // Date when the property becomes available
  bookings?: Booking[]; 
}