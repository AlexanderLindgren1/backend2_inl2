import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/utlis/jwt";

export async function GET(req: Request) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 } // Unauthorized status code
      );
    }

    // Verify and decode the JWT
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Extract the user ID from the decoded payload
    const userId = decoded.id; // Ensure your JWT payload includes `id`

    // Find the user in the database
    const getUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!getUser) {
      return NextResponse.json(
        { message: "User could not be found" },
        { status: 404 }
      );
    }

    return NextResponse.json(getUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
