type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  bookings?: Booking[];
  properties?: Property[];
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  bookings?: Booking[];
  properties?: Property[];
};

type UserLogin = {
  email: string;
  password: string;
};

type UserRegister = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

type UserPassword = {
  password: string;
  email: string;
};

type UserContextState = {
  user: UserRecord | null;
  login: (user: UserLogin) => Promise<void>;
  register: (user: UserRegister) => Promise<void>;
  logout: () => void;
  token: string | null;
  fetchUserProperties: () => Promise<void>;
};

type Property = {
  id: string;
  address: string;
};

type AuthResponse = {
  token: string;
  status?: number;
};

type PropertyRecord = {
  id: string;
  name: string;
  description: string;
  place: string;
  pricePerNight: number;
};
