import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { propertyApi } from "../../utlis/propertyApi";
import { useUserContext } from "./UserContext";

const defaultPropertyContextState: PropertyContextState = {
  properties: [],
  userProperties: [],
  selectedProperty: null,
  setSelectedProperty: () => {},
  createProperty: async () => {},
  updateProperty: async () => {},
  deleteProperty: async () => {},
  getProperties: async () => {},
  getAllPropertyByUser: async () => {},
  getPropertyById: async (id: string): Promise<PropertyRecord> => { throw new Error("Not implemented"); },
};

const PropertyContext = createContext<PropertyContextState>(defaultPropertyContextState);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const [properties, setProperties] = useState<PropertyRecord[]>([]);
  const [userProperties, setUsersProperties] = useState<PropertyRecord[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyRecord | null>(null);

  const getProperties = async () => {
    try {
      const properties = await propertyApi.getProperties();
      setProperties(properties);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  };

  const createProperty = async (data: PropertyInput) => {
    try {
      const newProperty = await propertyApi.createProperty(data);
      setProperties((prevProperties) => [...prevProperties, newProperty]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProperty = async (id: string, data: PropertyData) => {
    try {
      const updatedProperty = await propertyApi.updateProperty(id, data);
      setProperties((prevProperties) =>
        prevProperties.map((property) => (property.id === id ? updatedProperty : property))
      );
      setUsersProperties((prevProperties) =>
        prevProperties.map((property) => (property.id === id ? updatedProperty : property))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getPropertyById = async (id: string) => {
    try {
      const property = await propertyApi.getPropertyById(id);
      setSelectedProperty(property);
      return property;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await propertyApi.deleteProperty(id);
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPropertyByUser = async () => {
    if (!user) return;
    try {
      const properties_ = await propertyApi.getAllPropertyByUser();
      setUsersProperties(properties_);
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllPropertyByUser();
    }
  }, [user]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        selectedProperty,
        setSelectedProperty,
        createProperty,
        updateProperty,
        deleteProperty,
        getProperties,
        getAllPropertyByUser,
        userProperties,
        getPropertyById,
      }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
