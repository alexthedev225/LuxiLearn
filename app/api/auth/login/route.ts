import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Récupère l'admin dans la DB
  const admin = await prisma.user.findUnique({ where: { username } });
  if (!admin) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 401 }
    );
  }

  // Vérifie le mot de passe
  const valid = bcrypt.compareSync(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Mot de passe incorrect" },
      { status: 401 }
    );
  }

  // Génère le token JWT
  const token = await new SignJWT({ userId: admin.id, isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(JWT_SECRET);

  // Réponse avec cookie HttpOnly
  const response = NextResponse.json({ message: "Connecté avec succès" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 60 * 60, // 2h
  });

  return response;
}
