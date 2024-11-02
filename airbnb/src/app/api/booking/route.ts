import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
FormData;
export async function GET(req: NextRequest) {
  try {
    const allBookings = await prisma.booking.findMany();
    if (!allBookings) {
      return NextResponse.json({ message: "There are none bookings" });
    }

    return NextResponse.json(allBookings);
  } catch (err) {
    return NextResponse.json(
      { message: `there are an error here: \n ${err}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const newBooking: CreateBookingRequest = JSON.parse(rawBody);

    // Check if the propertyId is defined
    if (!newBooking.propertyId) {
      throw new Error("Property ID is missing from the request");
    }

    // Check if the user exists
    const bookingUser = await prisma.user.findUnique({
      where: {
        id: newBooking.user,
      },
    });

    if (!bookingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the property exists
    const bookingProperty = await prisma.property.findUnique({
      where: {
        id: newBooking.propertyId,
      },
    });

    if (!bookingProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    const getTotalPrice = (): number =>{
      let a = new Date(newBooking.checkingOut).getTime()
      let b = new Date(newBooking.checkingIn).getTime()
      const nights = (a-b)/1000/60/60/24
      const pricePerNight = bookingProperty.pricePerNight; // Assuming you want to set total price based on property
      console.log("per night", nights);
      console.log("price per night", pricePerNight);
      
      
      return pricePerNight * nights
    }

    // Create the booking
  
    

    const createBooking = await prisma.booking.create({
      data: {
        createdAt: new Date(),
        checkingIn: new Date(newBooking.checkingIn),
        checkingOut: new Date(newBooking.checkingOut),
        totalPrice:  getTotalPrice(),
        user: { connect: { id: newBooking.user } },
        property: { connect: { id: newBooking.propertyId } },
      },
    });



    return NextResponse.json(createBooking, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: `Error occurred while creating booking: ${err}` },
      { status: 500 }
    );
  }
}
