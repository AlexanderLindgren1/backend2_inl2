
import { NextRequest, NextResponse } from "next/server";


import bcrypt from "bcrypt"
import prisma from "@/app/lib/prisma";
//move thistype to other file for exempel types.d.user
type UserRegistrationData ={
    name: string
    email: string
    password:string
    isAdmin: boolean
    createdAt: Date;
    bookings?: Booking[];
}


export async function POST(req: NextRequest) {
    const newUser = await req.json();
  if(!newUser){
   
    return NextResponse.json({message: "error accrued"}, {status: 500})
  
  }
  const createUser = await prisma.user.create({
    data:{
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin || false,
      createdAt: new Date()
    }
  })
  if(!createUser){
    return NextResponse.json({message: "User could not be created"},{status: 400})
  }
  return NextResponse.json(createUser, {status: 201})
  
  }
  