import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/utlis/jwt";

export async function GET(req: Request) {
  try {
    const token  = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId: string = decoded.id;

    const getBookings = await prisma.booking.findMany({
      where: { userId: userId },
      include: {
        property: true
      }
    });

    if (!getBookings) {
      return NextResponse.json(
        { message: "No bookings found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(getBookings);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the bookings" },
      { status: 500 }
    );
  }
}
