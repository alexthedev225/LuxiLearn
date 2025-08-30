// api/admin/lessons/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Exercise {
  title: string;
  prompt: string;
  solution: string;
  validateCode: string | null;
}

interface Quiz {
  question: string | null;
  options: string[];
  correctAnswer: string | null;
}

interface LessonBody {
  courseSlug: string;
  title: string;
  description: string;
  duration: string;
  slug: string;
  content: string;
  exercise?: Exercise;
  quizzes?: Quiz[];
}

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        slug: true,
        content: true,
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        exercise: true,
        quizzes: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc", // Trier par date de création, les plus récentes en premier
      },
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("Erreur récupération leçons :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LessonBody = await request.json();

    const createdLesson = await prisma.lesson.create({
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        slug: body.slug,
        content: body.content,
        course: { connect: { slug: body.courseSlug } },
        exercise: body.exercise ? { create: { ...body.exercise } } : undefined,
        quizzes: {
          create: (body.quizzes || []).map((quiz) => ({ ...quiz })),
        },
      },
      include: { exercise: true, quizzes: true, course: true },
    });

    revalidatePath(`/courses/${body.courseSlug}`);
    revalidatePath(`/courses/${body.courseSlug}/lessons/${body.slug}`);

    return NextResponse.json({ lesson: createdLesson }, { status: 201 });
  } catch (error) {
    console.error("Erreur création leçon :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la leçon" },
      { status: 500 }
    );
  }
}
