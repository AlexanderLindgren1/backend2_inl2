import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utlis/bcrypt";
import { signJWT } from "@/utlis/jwt";
import prisma from "@/app/lib/prisma";

type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  bookings?: Booking[];
};

export async function POST(req: NextRequest) {
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

    const token = await signJWT({ id: createUser.id });

    if (!token) {
      return NextResponse.json(
        {
          message: "JWT signing failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ token }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: `there are an error here: \n ${err}` },
      { status: 500 }
    );
  }
}
