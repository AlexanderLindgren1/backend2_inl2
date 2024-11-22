import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/utlis/jwt";

export async function GET(req: Request) {
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

    const userId = decoded.id;

    const getPropertys = await prisma.property.findMany({
      where: { ownerId: userId },
    });

    if (!getPropertys) {
      return NextResponse.json(
        { message: "User could not be found" },
        { status: 404 }
      );
    }

    return NextResponse.json(getPropertys);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
