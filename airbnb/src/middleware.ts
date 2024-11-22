import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utlis/jwt";

const UNSAFE_METHODS = ["POST", "PUT", "DELETE"];

export async function middleware(req: NextRequest) {
    if (req.method === "GET" && req.nextUrl.pathname.startsWith("/api/property")) {
        return NextResponse.next(); 
    }
    if (UNSAFE_METHODS.includes(req.method)) {
        const authorization = req.headers.get("Authorization");
        if (!authorization) {
            return NextResponse.json({
                message: "Unauthorized",
            }, { status: 401 });
        }

        try {
            const token = authorization.replace("Bearer ", "");
            const payload = await verifyJWT(token);
            if (payload == null) {
                throw new Error("Invalid token");
            }

            const headers = new Headers(req.headers);
            headers.set("userid", payload.id);

            return NextResponse.next({
                headers: headers,
            });

        } catch (err) {
            return NextResponse.json({
                message: "Unauthorized",
            }, {
                status: 401,
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/booking",
        "/api/property",  
        "/api/user/me",
        "/api/property/me"
    ]
};
