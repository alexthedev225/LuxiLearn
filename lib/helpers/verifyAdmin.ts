import { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

interface AdminPayload extends JWTPayload {
  userId: number;
  isAdmin: boolean;
}

export async function verifyAdmin(
  req: NextRequest
): Promise<{ userId: number }> {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Token manquant");

  const { payload } = (await jwtVerify(token, JWT_SECRET)) as {
    payload: AdminPayload;
  };

  if (!payload.isAdmin) throw new Error("Accès refusé");

  return { userId: payload.userId }; // ✅ typé correctement
}
