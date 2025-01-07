"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "../app/context/UserContext";
import { usePropertyContext } from "../app/context/PropertyContext";
import PropertyForm from "../app/component/PropertyForm";
import { useBookingContext } from "../app/context/BookingContext";
import Link from "next/link";

function UserPage() {
  const { bookingsFromUser, getBooksByUser, deleteBooking } = useBookingContext();
  const { user } = useUserContext();
  const { userProperties, getAllPropertyByUser, deleteProperty } =
    usePropertyContext();


  console.log("in user page", userProperties);
  console.log("in profile", bookingsFromUser);

  useEffect(() => {
    if (user) {
      getAllPropertyByUser();
      getBooksByUser();
    }
  }, [user]);

  const handleDeleteProperty = async (id: string) => {
    try {
      await deleteProperty(id);
      if (user) {
        getAllPropertyByUser(); 
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      if (user) {
        getBooksByUser(); 
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <PropertyForm />
        </>
      ) : (
        <div className="text-lg text-red-500 mb-4">
          Please log in to view your properties.
        </div>
      )}

      {userProperties.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            You have no properties
          </h1>
        </div>
      ) : (
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            your Properties
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property: PropertyRecord, index: number) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <h2 className="text-xl font-semibold text-gray-800">
                  {property.name}
                </h2>
                <p className="text-gray-600">{property.description}</p>
                <p className="text-sm text-gray-500">{property.place}</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${property.pricePerNight}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={{
                      pathname: `/propertyUpdate`,
                      query: { id: property.id },
                    }}>
                    Update
                  </Link>

                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add bookings section */}
      {bookingsFromUser.length > 0 && (
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Bookings
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookingsFromUser.map((booking, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  {booking.property?.name}
                </h2>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Check-in:</span> {new Date(booking.checkingIn).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Check-out:</span> {new Date(booking.checkingOut).toLocaleDateString()}
                  </p>

                  <p className="text-lg font-bold text-green-600">
                    Total Price: ${booking.totalPrice}
                  </p>

                  <p>
                    <span>
                      Place: {booking.property?.place}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Delete Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserPage;
