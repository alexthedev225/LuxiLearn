// /app/api/courses/[slug]/lessons/[lessonSlug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string; lessonSlug: string }>;
  }
) {
  const { slug, lessonSlug } = await params;

  // Récupère le cours avec TOUTES ses leçons (sans filtrer sur lessonSlug)
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
      technologies: true,
      slug: true,
      duration: true,
      image: true,
      lessons: {
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          slug: true,
          // on peut enlever content/exercise/quizzes ici pour alléger la réponse
        },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!course) {
    return NextResponse.json(
      { error: `Course with slug '${slug}' not found.` },
      { status: 404 }
    );
  }

  // Trouve la leçon spécifique dans la liste
  const lesson = await prisma.lesson.findFirst({
    where: {
      courseId: course.id,
      slug: lessonSlug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      slug: true,
      content: true,
      exercise: {
        select: {
          description: true,
          starterCode: true,
          solutionCode: true,
        },
      },
      quizzes: {
        select: {
          id: true,
          question: true,
          options: true,
          correctAnswer: true,
        },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json(
      { error: `Lesson with slug '${lessonSlug}' not found in course.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    course,
    lesson,
  });
}
