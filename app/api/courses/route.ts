// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: {
          include: {
            exercise: true,
            quizzes: true,
          },
        },
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("API fetch courses error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des cours" },
      { status: 500 }
    );
  }
}
