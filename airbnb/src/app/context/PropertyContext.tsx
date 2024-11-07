import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { propertyApi } from "../../utlis/propertyApi";

const defaultPropertyContextState: PropertyContextState = {
    properties: [],
    selectedProperty: null,
    setSelectedProperty: () => {},
    createProperty: async () => {},
    updateProperty: async () => {},
    deleteProperty: async () => {},
    getProperties: async () => {},
}

const PropertyContext = createContext<PropertyContextState>(defaultPropertyContextState);

export const PropertyProvider = ({children}: {children: ReactNode})=> {
    const [properties, setProperties] = useState<PropertyRecord[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<PropertyRecord | null>(null);


    const getProperties = async ()=> {
        try {
            const properties = await propertyApi.getProperties();
            setProperties(properties);
        } catch (error) {
            console.log(error);
        }
    }
    const createProperty = async (data: PropertyInput) => {
        console.log("the data is", data);
        
        try {
            const newProperty = await propertyApi.createProperty(data);
            console.log("new property", newProperty);
            
            setProperties((prevProperties)=> [...prevProperties, newProperty]);
        } catch (error) {
            console.log(error);
        }
    }
    const updateProperty = async (id: string, data: PropertyData) => {
        try {
            const updatedProperty = await propertyApi.updateProperty(id, data);

            setProperties((prevProperties) => prevProperties.map((property) => property.id === id ? updatedProperty : property));
        } catch (err) {
            console.error(err);
        }
    }
    const deleteProperty = async (id: string) => {
        try {
            await propertyApi.deleteProperty(id);
            setProperties((prevProperties)=> prevProperties.filter((property)=> property.id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        getProperties();
    }, []);
    return (
        <PropertyContext.Provider value={{
            properties,
            selectedProperty,
            setSelectedProperty,
            createProperty,
            updateProperty,
            deleteProperty,
            getProperties,


        }}>
            {children}
        </PropertyContext.Provider>
    )
}
export const usePropertyContext = ()=> useContext(PropertyContext);

