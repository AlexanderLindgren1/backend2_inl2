import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { comparePasswords } from "@/utlis/bcrypt";
import { signJWT } from "@/utlis/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    if(!body.email || !body.password){
        return NextResponse.json({message: "You need to add both email and password"})
    }

    const User = await prisma.user.findUnique({
      where: {
        email:  body.email,
      },
    });
    if(!User){
        return NextResponse.json({message: "There are no account by this email"})
        
    }
    const comparedPassword = await comparePasswords(body.password,User.password);
    console.log("Password in login are: ",comparedPassword);
    const token = await signJWT(
        {
          id: User.id
        }
      )
      if(!token){
        return NextResponse.json({message: `something wrong in signJWT. the error are : ${token}`})
      }
      console.log("login succesfully");
      
    return NextResponse.json(token, {status: 201})

    
  } catch (err) {
    NextResponse.json({
      message: `This are an to login the reason are ${err}`,
    });
  }
}
