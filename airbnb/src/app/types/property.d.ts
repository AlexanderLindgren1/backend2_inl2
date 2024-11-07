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
  bookings?: Booking[] |  null;
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

}
type PropertyFormProps = {
  selectedProperty?: PropertyRecord | null; // Allow null
}
interface PropertyData {
  id: string; // Changed from number to string
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  availableFrom: boolean;
}

