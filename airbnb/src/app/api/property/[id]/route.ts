import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utlis/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    if (!propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const userId:string = decoded.id;
    const propertyId:string = params.id;

    const propertyData:Property = await req.json();

    const { ownerId, id, available, ...updatedData } = propertyData;

 

    const property = await prisma.property.update({
      where: { id: propertyId },
      data: {
        name: updatedData.name,
        pricePerNight: updatedData.pricePerNight,
        place: updatedData.place,
        description: updatedData.description,
        available: available,
      },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json(
      { message: `Error updating property: ${err}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    if (!propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }


    await prisma.booking.deleteMany({
      where: { propertyId: propertyId },
    });


    const deletedProperty = await prisma.property.delete({
      where: { id: propertyId },
    });

    return NextResponse.json(
      {
        message: `Successfully deleted Property with ID: ${deletedProperty.id} and all associated bookings`,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Error deleting property: ${err}` },
      { status: 500 }
    );
  }
}
