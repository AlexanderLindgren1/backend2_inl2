import prisma from "@/app/lib/prisma";
import { signJWT } from "@/utlis/jwt";
import { hashPassword } from "@/utlis/bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const allUsers = await prisma.user.findMany();
    if (!allUsers) {
      return NextResponse.json({ message: "There are none users" });
    }

    return NextResponse.json(allUsers);
  } catch (err) {
    return NextResponse.json(
      { message: `there are an error here: \n ${err}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("in backend register route");

  //ändra newuser till body
  //kolla om man behöver register map för detta eller fungerar det ha detsamma
  //samma sak med login
  // lägg till en haserror och error för att hantera body:n senare
  try {
    const newUser: User = await req.json();
    if (!newUser) {
      return NextResponse.json({ message: "error accrued" }, { status: 500 });
    }

    const hashedPassword = await hashPassword(newUser.password);

    const createUser = await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email.toLowerCase(),
        password: hashedPassword,
        isAdmin: newUser.isAdmin || false,
        createdAt: new Date(),
      },
    });
    if (!createUser) {
      return NextResponse.json(
        { message: "User could not be created" },
        { status: 400 }
      );
    }
    const token = await signJWT({
      id: createUser.id,
    });
    if (!token) {
      return NextResponse.json({
        message: `something wrong in signJWT. the error are : ${token}`,
      });
    }

    console.log("token", token);

    return NextResponse.json(token, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: `there are an error here: \n ${err}` },
      { status: 500 }
    );
  }
}
