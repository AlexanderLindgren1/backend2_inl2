type Booking = {
  id: string;
  createdAt: Date;
  checkingIn: Date;
  checkingOut: Date;
  totalPrice: number;
  user: User;
  userId: string;
  property?: Property;
  propertyId: string;
};

interface BookingFormProps {
  property: PropertyRecord;
}

type BookingInput = {
  totalPrice: number;
  checkingIn: string | Date;
  checkingOut: string | Date;
  propertyId: string;
};

type BookingContextState = {
  bookingsFromUser: Booking[];
  bookings: Booking[];
  currentBooking: CreateBookingRequest | null;

  setCurrentBooking: (booking: CreateBookingRequest | null) => void;
  addBooking: (data: BookingInput) => Promise<void>;
  clearBooking: () => void;
  getBooksByUser: () => Promise<void>;
  deleteBooking: (id)=> Promise<void>;
};


//coming form prisma

type PrismaBooking = {
  id: string;
  createdAt: Date;
  checkingIn: Date;
  checkingOut: Date;
  totalPrice: number;
  userId: string;
  propertyId: string;
};


const getUser: {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}


type booking = {
  
    id: string;
    userId: string;
    propertyId: string;
    checkingOut: Date;
    checkingIn: Date;
    user: User;
    totalPrice: number;
  
}