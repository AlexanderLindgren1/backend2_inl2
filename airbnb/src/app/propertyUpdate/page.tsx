"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { usePropertyContext } from "../context/PropertyContext";
import { useUserContext } from "../context/UserContext";

type FormState = {
  name: string;
  pricePerNight: number;
  place: string;
  description: string;

};

const PropertyUpdatePage = () => {
  const { user } = useUserContext();
  const { getPropertyById, updateProperty } = usePropertyContext();
  const [formState, setFormState] = useState<FormState>({
    name: "",
    pricePerNight: 0,
    place: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  // Fetch property data when the ID changes
  const fetchProperty = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const propertyData = await getPropertyById(id);
      if (propertyData) {
        setFormState({
          name: propertyData.name || "",
          pricePerNight: propertyData.pricePerNight || 0,
          place: propertyData.place || "",
          description: propertyData.description || "",
      
        });
      }
    } catch (err) {
      setError("Failed to fetch property details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (!user) {
    return <div>Please log in to update your property.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!id) {
      setError("Property ID is missing.");
      return;
    }

    if (!formState.name || !formState.pricePerNight || !formState.place) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await updateProperty(id, { ...formState, id, ownerId: user.id });
      window.location.href = "/profile";
    } catch (err) {
      setError("Failed to update property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Property</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
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
              onChange={(e) =>
                setFormState({ ...formState, place: e.target.value })
              }
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
                setFormState({
                  ...formState,
                  pricePerNight: Number(e.target.value),
                })
              }
              placeholder="Price per night"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              min="50"
                max="1500"
            />
          </div>
          <div>
            <input
              type="text"
             
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              minLength={10}
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Property
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyUpdatePage;





























