type Property = {
  name: string;
  description: string;
  place: string;
  pricePerNight: number;
  availableFrom: boolean;
  bookings?: Booking[];
};

type PropertyRecord = {
  id: string;
  name: string;
  description: string;
  place: string;
  pricePerNight: number;
  availableFrom: boolean;
  bookings?: Booking[];
};



type PropertyContextState = {
  properties: PropertyRecord[];
  selectedProperty: PropertyRecord | null;
  setSelectedProperty: (property: PropertyRecord | null) => void;
  createProperty: (data: PropertyInput) => Promise<void>;
  updateProperty: (id: string, data: PropertyData) => Promise<void>; // Accepts PropertyData
  deleteProperty: (id: string) => Promise<void>;
  getProperties: () => Promise<void>;
};


type PropertyInput = {
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  availableFrom: boolean;
  bookings: Booking;
}
type PropertyFormProps = {
  selectedProperty?: PropertyRecord | null; // Allow null
}
