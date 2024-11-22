import * as Jose from "jose";

type JWTPayload = {
  [key: string]: any;
};

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_Secret environment variable is not set");
}

const encodedSecret = new TextEncoder().encode(secret);

export async function signJWT(payload: JWTPayload): Promise<string> {
  const response = await new Jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedSecret);
  return response;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await Jose.jwtVerify(token, encodedSecret);
    return payload as JWTPayload;
  } catch (e) {
    return null;
  }
}
