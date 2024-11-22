import { useEffect, useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { Property } from "./PropertyCard";
import { useUserContext } from "../context/UserContext";
// import { useBookingContext } from "../context/BookingContext"; 

const PropertyList = () => {

  // const {bookings} = useBookingContext();
  // console.log("booking",bookings);
  
  const { properties, getProperties } = usePropertyContext();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getProperties().finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Welcome to Our Properties</h2>
          <p className="mt-2 text-gray-600">Please log in to view available properties</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg shadow-md"
          >
            <Property property={property}/> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
