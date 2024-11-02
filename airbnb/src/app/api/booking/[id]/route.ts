import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;
  console.log(bookingId);

  const booking = await prisma.booking.findUnique({
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
        const bookingData = await req.json();
      console.log(1);
      
        const booking = await prisma.booking.update({
          where: {
            id: bookingId,
          },
          data: bookingData,
        });
      
        if (!booking) {
          return NextResponse.json({ message: "booking not found" }, { status: 404 });
        }
        return NextResponse.json(booking);
    }
    catch(err){
        return NextResponse.json({message:`the error are from update are: ${err}`},{status:500

        })
    }

}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;
  if (!bookingId) {
    return NextResponse.json(
      { message: "there are none to delete by this id" },
      { status: 404 }
    );
  }
  const deletedBooking = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
  if (!deletedBooking) {
    return NextResponse.json(
      { message: "There are none users by the id" },
      { status: 404 }
    );
  }
  return NextResponse.json(`Sussesfully deleted booking ${deletedBooking}`, { status: 201 });
}
