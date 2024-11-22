"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BookingForm from '../component/BookingForm';
import { useUserContext } from "../context/UserContext";
import { usePropertyContext } from '../context/PropertyContext';

export default function PropertyPage() {
  const { getPropertyById } = usePropertyContext();
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [property, setProperty] = useState<PropertyRecord | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          const chosenProperty = await getPropertyById(id);
          setProperty(chosenProperty);

          if (chosenProperty.available) setIsAvailable(true);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
    };

    fetchProperty();
  }, [id]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-3xl px-4">
        <Link 
          href="/" 
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Property Details</h1>
        {property ? (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="border-b pb-6">
              <h2 className="text-3xl font-semibold text-gray-700">{property.name}</h2>
              <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 font-medium">Location</p>
                <p className="text-lg font-light">{property.place}</p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Price per Night</p>
                <p className="text-lg font-light">${property.pricePerNight}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 font-medium">Description</p>
              <p className="text-lg font-light">{property.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 font-medium">Availability</p>
                <p
                  className={`text-lg font-bold ${
                    isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isAvailable ? 'Available' : 'Not Available'}
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Available Dates</p>
                <p className="text-lg font-light">
                  {property.available.length > 0
                    ? `${formatDate(property.available[0])} - ${formatDate(property.available[property.available.length - 1])}`
                    : 'No dates available'}
                </p>
              </div>
            </div>

            {user && isAvailable && (
              <div className="mt-6">
                <BookingForm property={property} />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-lg text-gray-600">Loading property details...</p>
          </div>
        )}
      </div>
    </div>
  );
}
