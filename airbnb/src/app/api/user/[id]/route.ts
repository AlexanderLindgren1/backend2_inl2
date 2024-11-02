import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  console.log(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try{
        const userId = params.id;
        const userData = await req.json();
      console.log(1);
      
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: userData,
        });
      
        if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
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
  const userId = params.id;
  if (!userId) {
    return NextResponse.json(
      { message: "there are none to delete by this id" },
      { status: 404 }
    );
  }
  const DeletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  if (!DeletedUser) {
    return NextResponse.json(
      { message: "There are none users by the id" },
      { status: 404 }
    );
  }
  return NextResponse.json(`Sussesfully deleted user ${DeletedUser}`, { status: 201 });
}
