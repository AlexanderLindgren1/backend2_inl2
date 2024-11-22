import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { generateAvailabilityDates } from "@/utlis/availability";

export async function GET(req: NextRequest) {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching properties" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('userid');
  if (!userId) {
    return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
  }

  const newProperty:Property = await req.json();
  if (!newProperty) {
    return NextResponse.json({ message: 'Invalid property data' }, { status: 400 });
  }

  try {
    const createProperty = await prisma.property.create({
      data: {
        name: newProperty.name,
        description: newProperty.description,
        place: newProperty.place,
        pricePerNight: Number(newProperty.pricePerNight),
        available: generateAvailabilityDates(newProperty.available),
        owner: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(createProperty, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `An error occurred while creating the property: ${error}` },
      { status: 500 }
    );
  }
}
