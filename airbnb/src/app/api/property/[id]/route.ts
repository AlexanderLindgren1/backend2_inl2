import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
  console.log(propertyId);

  const property = await prisma.user.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    return NextResponse.json({ message: "property not found" }, { status: 404 });
  }
  return NextResponse.json(property);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try{
        const propertyId = params.id;
        const propertyData = await req.json();
      console.log(1);
      
        const property = await prisma.property.update({
          where: {
            id: propertyId,
          },
          data: propertyData,
        });
      
        if (!property) {
          return NextResponse.json({ message: "property not found" }, { status: 404 });
        }
        return NextResponse.json(property);
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
  const propertyId = params.id;
  if (!propertyId) {
    return NextResponse.json(
      { message: "there are none to delete by this id" },
      { status: 404 }
    );
  }
  const deletedProperty = await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });
  if (!deletedProperty) {
    return NextResponse.json(
      { message: "There are none users by the id" },
      { status: 404 }
    );
  }
  return NextResponse.json(`Sussesfully deleted Property ${deletedProperty}`, { status: 201 });
}
