import React, { useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";

type FormState = {
  name: string;
  pricePerNight: number;
  place: string;
  description: string;
  available: string[]; 
};

function PropertyForm() {

  const { createProperty, getAllPropertyByUser } = usePropertyContext();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    pricePerNight: 0,
    place: "",
    description: "",
    available: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProperty({
      ...formState,
      available: formState.available.map((date) => date.toString()),
    });
    getAllPropertyByUser();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      available: [...prevState.available, selectedDate],
    }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Property Name"
            className="w-full p-2 border border-gray-300 rounded-md"
           minLength={7}
           required
          />
        </div>
        <div>
          <input
            type="text"
            value={formState.place}
            onChange={(e) => setFormState({ ...formState, place: e.target.value })}
            placeholder="Place"
            className="w-full p-2 border border-gray-300 rounded-md"
            minLength={10}
            required
            
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
            min="50"
            max="1500"
          />
        </div>
        <div>
          <input
            type="text"
            value={formState.description}
            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md "
  
            required 
            minLength={10}
        
            
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Available</label>
          <input
            type="date"
            value={formState.available[formState.available.length - 1] || ""}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            min={new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Property
        </button>
      </form>
    </div>
  );
}

export default PropertyForm;
