type CreateBookingRequest = {
  totalPrice: number;       // Total price for the booking
  user: string;             // User ID of the person making the booking
  checkingIn: string | Date; // Check-in date as string or Date object
  checkingOut: string | Date; // Check-out date as string or Date object
  propertyId: string;       // ID of the associated property
};

type Booking = {
  id: string;              // Unique identifier for the booking
  createdAt: Date;        // Date and time when the booking was created
  checkingIn: Date;       // Check-in date
  checkingOut: Date;      // Check-out date
  totalPrice: number;     // Total price for the booking
  user: User;             // User who made the booking
  property?: Property;     // Optional: Property associated with the booking
  propertyId: string;     // ID of the associated property
};
