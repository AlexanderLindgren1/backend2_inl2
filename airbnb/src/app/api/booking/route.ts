import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "@/utlis/jwt";
import { User } from "@nextui-org/react";

export async function GET(req: NextRequest) {
  try {
    const allBookings = await prisma.booking.findMany();
    if (!allBookings) {
      return NextResponse.json({ message: "There are no bookings" });
    }

    return NextResponse.json(allBookings);
  } catch (err) {
    return NextResponse.json(
      { message: `There is an error here: \n ${err}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user: {
      id: string;
      createdAt: Date;
      name: string;
      email: string;
      password: string;
      isAdmin: boolean;
    } = await res.json();

    const newBooking: {
      id: string;
      userId: string;
      propertyId: string;
      checkingOut: Date;
      checkingIn: Date;
      user: User;
      totalPrice: number;
    } = await req.json();
    newBooking.userId = user.id;

    if (!newBooking.propertyId) {
      return NextResponse.json(
        { message: "Property ID is missing" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: newBooking.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    if (user.id === property.ownerId) {
      return NextResponse.json(
        { message: "Property owner cannot book their own property" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId: newBooking.propertyId,

        userId: newBooking.userId,
        checkingIn: new Date(newBooking.checkingIn),
        checkingOut: new Date(newBooking.checkingOut),
        totalPrice: newBooking.totalPrice,
      },
    });

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Error occurred while creating booking: ${error}` },
      { status: 500 }
    );
  }
}
