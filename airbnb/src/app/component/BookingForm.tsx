"use client";
import { useState } from "react";
import { useBookingContext } from "../context/BookingContext";
import { useUserContext } from "../context/UserContext";

interface BookingFormProps {
  property: PropertyRecord;
}

export default function BookingForm({
  property,
}: BookingFormProps) {
  const { addBooking } = useBookingContext();
  const { user } = useUserContext();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDates, setBookingDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if the current user is the owner of the property
  const isOwner = user?.id === property.ownerId;

  const calculateTotalPrice = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfNights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return numberOfNights * property.pricePerNight;
  };

  const validateDates = (startDate: string, endDate: string): boolean => {
    const propertyStartDate = new Date(property.available[0]);
    const propertyEndDate = new Date(property.available[property.available.length - 1]);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start >= propertyStartDate && end <= propertyEndDate;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateDates(bookingDates.startDate, bookingDates.endDate)) {
      setError("Please select dates that fall within the available range for this property.");
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        totalPrice: calculateTotalPrice(bookingDates.startDate, bookingDates.endDate),
        checkingIn: bookingDates.startDate,
        checkingOut: bookingDates.endDate,
        propertyId: property.id,
      };

      await addBooking(bookingData);
      setShowBookingForm(false);
    } catch (err: any) {
      console.log(err);
      
      setError(err.response?.data?.message || `Failed to create booking, reason: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {isOwner ? (
        <div className="text-gray-600 italic">This is your property</div>
      ) : (
        <>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {showBookingForm ? "Hide Booking Form" : "Book Now"}
          </button>

          {showBookingForm && (
            <form onSubmit={handleBookingSubmit} className="mt-4 space-y-4">
              <div>
                <h4>BTW: You can not book today</h4>
                <label className="block text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={bookingDates.startDate}
                  onChange={(e) =>
                    setBookingDates({
                      ...bookingDates,
                      startDate: e.target.value,
                    })
                  }
                  min={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  min={new Date(Date.now() +1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  value={bookingDates.endDate}
                  onChange={(e) =>
                    setBookingDates({
                      ...bookingDates,
                      endDate: e.target.value,
                      
                    })
                    
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {bookingDates.startDate && bookingDates.endDate && (
                <>
                  <div className="text-lg font-semibold">
                    Total Price: $
                    {calculateTotalPrice(bookingDates.startDate, bookingDates.endDate)}
                  </div>
                  <div className="text-gray-600">
                    Selected Dates: [{bookingDates.startDate}] - [{bookingDates.endDate}]
                  </div>
                </>
              )}
              {error && <div className="text-red-500">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
