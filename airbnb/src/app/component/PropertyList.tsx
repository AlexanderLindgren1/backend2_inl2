import { usePropertyContext } from "../context/PropertyContext";
import { Property } from "./Property";

const PropertyList = () => {
  const { properties, deleteProperty, setSelectedProperty } =
    usePropertyContext();
    console.log("in PropertyList");
    
  return (
    <div className="property-list">
      {properties.map((property) => (
        <Property
          key={property.id}
          property={property}
          deleteProperty={()=> deleteProperty(property.id)}
          setSelectedProperty={setSelectedProperty}
        />
      ))}
    </div>
  );
};
export default PropertyList

