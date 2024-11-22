import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;

   const booking: {
    id: string;
    createdAt: Date;
    checkingIn: Date;
    checkingOut: Date;
    totalPrice: number;
    userId: string;
    propertyId: string;
} | null = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json(booking);
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try{
        const bookingId = params.id;
        const bookingData:BookingInput = await req.json();
      
        const booking:PrismaBooking = await prisma.booking.update({
          where: {
            id: bookingId,
          },
          data: bookingData,
        });
      
        if (!booking) {
          return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }
        return NextResponse.json(booking);
    }
    catch(err){
        return NextResponse.json({message:`The error from update are: ${err}`},{status:500})
    }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;
  if (!bookingId) {
    return NextResponse.json(
      { message: "There are none to delete by this id" },
      { status: 404 }
    );
  }
  const deletedBooking:PrismaBooking = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
  if (!deletedBooking) {
    return NextResponse.json(
      { message: "There are no users by this id" },
      { status: 404 }
    );
  }
  return NextResponse.json(`Successfully deleted booking ${deletedBooking}`, { status: 201 });
}
