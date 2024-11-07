import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { comparePasswords } from "@/utlis/bcrypt";
import { signJWT } from "@/utlis/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Check if email and password are provided
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "You need to add both email and password" },
        { status: 400 }
      );
    }

    // Retrieve user by email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "There is no account with this email" },
        { status: 404 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "The password is incorrect" },
        { status: 401 }
      );
    }

    // Sign JWT if login is successful
    const token = await signJWT({ id: user.id });

    // Return the token to the client
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Login error: ${error}` },
      { status: 500 }
    );
  }
}
