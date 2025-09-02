import { NextResponse, NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  // Crée une réponse vide
  const response = NextResponse.json({ message: "Déconnecté avec succès" });

  // Supprime le cookie "token"
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // met le cookie à expiration immédiate
  });

  return response;
}
