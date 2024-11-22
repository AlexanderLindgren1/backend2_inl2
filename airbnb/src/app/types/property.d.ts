type Property = {
  id: string;
  name: string;
  description: string;
  place: string;
  pricePerNight: number;
  available: date[];
  bookings?: Booking[];
  ownerId: string;
};

type PropertyRecord = {
  id: string;
  name: string;
  description: string;
  place: string;
  pricePerNight: number;
  available: date[];
  bookings?: Booking[] | null;
  ownerId: string;
};

type PropertyInput = {
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  available: date[];
  bookings?: Booking[] | null;
};

type PropertyData = {
  id: string;
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  bookings?: Booking[] | null;
  ownerId: string;
};

type PropertyContextState = {
  userProperties: PropertyRecord[];
  properties: PropertyRecord[];
  selectedProperty: PropertyRecord | null;
  setSelectedProperty: (property: PropertyRecord | null) => void;
  createProperty: (data: PropertyInput) => Promise<void>;
  updateProperty: (id: string, data: PropertyData) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getPropertyById: (id: string) => Promise<PropertyRecord>;
  getProperties: () => Promise<void>;
  getAllPropertyByUser: () => Promise<void>;
};

