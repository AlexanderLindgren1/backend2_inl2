import React from "react";
import { useState } from "react";

import { usePropertyContext } from "../context/PropertyContext";

function PropertyForm({ selectedProperty }: PropertyFormProps) {
  const { createProperty, updateProperty, setSelectedProperty } =
    usePropertyContext();

  const [formState, setFormState] = useState({
    name: selectedProperty?.name || "",
    pricePerNight: selectedProperty?.pricePerNight || 0,
    place: selectedProperty?.place || "",
    description: selectedProperty?.description || "",
    availableFrom: selectedProperty?.availableFrom || false,
  });
  const handleSubmit = () => {
    if (selectedProperty) {
      updateProperty(selectedProperty.id, formState);
    } else {
      createProperty(formState);
    }
    setSelectedProperty(null);
  };
  return (
    <div>
      <h2>{selectedProperty ? "Update Property" : "Create Property"}</h2>
      <input
        type="text"
        value={formState.name}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        placeholder="property name"
      />

      <input
        type="text"
        value={formState.place}
        onChange={(e) => setFormState({ ...formState, place: e.target.value })}
        placeholder="Place"
      />
      <input
        type="number"
        value={formState.pricePerNight}
        onChange={(e) =>
          setFormState({ ...formState, pricePerNight: Number(e.target.value) })
        }
        placeholder="Price per night"
      />
      <input type="text" placeholder="description" onChange={(e) => setFormState({ ...formState, description: e.target.value })} />

      <input type="checkbox" checked={formState.availableFrom} onChange={(e) => setFormState({ ...formState, availableFrom: e.target.checked })} />
      <input
        type="submit"
        onClick={handleSubmit}
        value={selectedProperty ? "Update Property" : "Create Property"}

      />
    </div>
  );
}
export default PropertyForm;