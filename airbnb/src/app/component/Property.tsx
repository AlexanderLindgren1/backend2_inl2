import { usePropertyContext } from "../context/PropertyContext";

export function Property({ property, deleteProperty }: any) {
  // super viktigt att ta bort any sen!
  console.log("In property");

  const { setSelectedProperty } = usePropertyContext();
  return (
    <div
      className="p-4 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-50 cursor-pointer"
      onClick={() => setSelectedProperty(property)}>
      <h3 className="text-xl font-semibold text-blue-600">{property.name}</h3>
      <p className="text-gray-600">${property.pricePerNight} / night</p>
      <p className="text-gray-500">{property.place}</p>
      <p className="text-sm text-gray-400">{property.description}</p>
      <button
        onClick={deleteProperty}
        className="mt-4 py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600">
        Delete
      </button>
    </div>
  );
}
