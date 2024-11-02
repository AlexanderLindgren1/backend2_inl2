import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const allProperty = await prisma.property.findMany();
    if (!allProperty) {
      return NextResponse.json({ message: "There are none users" });
    }

    return NextResponse.json(allProperty);
  } catch (err) {
    return NextResponse.json(
      { message: `there are an error here: \n ${err}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const newProperty = await req.json();
if(!newProperty){
 
  return NextResponse.json({message: "error accrued"}, {status: 500})

}
const createProperty = await prisma.property.create({
  data:{
name: newProperty.name,
description:newProperty.description,
place:newProperty.place,
pricePerNight:newProperty.pricePerNight,
availableFrom:newProperty.availableFrom || false,

  }
})
if(!createProperty){
  return NextResponse.json({message: "User could not be created"},{status: 400})
}
return NextResponse.json(createProperty, {status: 201})

}
