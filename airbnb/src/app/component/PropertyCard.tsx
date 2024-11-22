import Link from "next/link";
// import { PropertyBooking } from "./PropertyBooking";  future update
export const Property = ({ property }: any) => {
  return (
    <Link href={{
      pathname: '/propertypage',
      query: { id: property.id },
    }}>
      <div className="bg-white rounded-lg overflow-hidden">

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
          <p className="text-gray-600 mb-2">{property.description}</p>
          <p className="text-gray-800 font-bold mb-2">${property.pricePerNight}/night</p>
          <p className="text-sm text-gray-600">
            Available: {new Date(property.available[0]).toLocaleDateString()} - {new Date(property.available[property.available.length - 1]).toLocaleDateString()}</p>
  
        </div>
      </div>
    </Link>
  );
};
