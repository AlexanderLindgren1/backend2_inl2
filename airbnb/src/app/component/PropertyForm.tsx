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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProperty) {
      updateProperty(selectedProperty.id, {...formState, id: selectedProperty.id});
    } else {
      createProperty(formState);
    }
    setSelectedProperty(null);
  };
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">{selectedProperty ? "Update Property" : "Create Property"}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="Property Name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="text"
          value={formState.place}
          onChange={(e) => setFormState({ ...formState, place: e.target.value })}
          placeholder="Place"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="number"
          value={formState.pricePerNight}
          onChange={(e) =>
            setFormState({ ...formState, pricePerNight: Number(e.target.value) })
          }
          placeholder="Price per night"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="text"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formState.availableFrom}
          onChange={(e) => setFormState({ ...formState, availableFrom: e.target.checked })}
          className="mr-2"
        />
        <label>Available from</label>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {selectedProperty ? "Update Property" : "Create Property"}
      </button>
    </form>
  </div>
  
  );
}
export default PropertyForm;