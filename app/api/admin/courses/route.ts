//api/admin/courses/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Typages des données
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

interface Lesson {
  title: string;
  description: string;
  duration: string;
  slug: string;
  content: string;
  exercise?: Exercise;
  quizzes?: Quiz[];
}

interface Course {
  title: string;
  description: string;
  level: string;
  slug: string;
  duration: string;
  technologies: string[];
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: { id: true, title: true, slug: true },
    });
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Erreur récupération cours :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const courseRaw = formData.get("course");
    if (!courseRaw) {
      return NextResponse.json(
        { error: "Champ course manquant" },
        { status: 400 }
      );
    }
    const course: Course = JSON.parse(courseRaw.toString());

    const lessonsRaw = formData.get("lessons");
    let lessons: Lesson[] = [];
    if (lessonsRaw) {
      lessons = JSON.parse(lessonsRaw.toString());
    }


    // Gestion technologies
    let technologies: string[] = [];
    if (Array.isArray(course.technologies)) {
      technologies = course.technologies;
    } else if (typeof course.technologies === "string") {
      try {
        technologies = JSON.parse(course.technologies);
        if (!Array.isArray(technologies)) {
          throw new Error("Technologies doit être un tableau");
        }
      } catch {
        return NextResponse.json(
          { error: "Format technologies invalide" },
          { status: 400 }
        );
      }
    }

    // Création cascade avec exercices et quiz
    const createdCourse = await prisma.course.create({
      data: {
        title: course.title ?? "",
        description: course.description ?? "",
        level: course.level ?? "",
        slug: course.slug ?? "",
        duration: course.duration ?? "",
        technologies,
        lessons: {
          create: lessons.map((lesson) => ({
            title: lesson.title ?? "",
            description: lesson.description ?? "",
            duration: lesson.duration ?? "",
            slug: lesson.slug ?? "",
            content: lesson.content ?? "",
            exercise: lesson.exercise
              ? {
                  create: {
                    title: lesson.exercise.title ?? "Titre temporaire",
                    prompt: lesson.exercise.prompt ?? "Prompt temporaire",
                    solution: lesson.exercise.solution ?? "Solution temporaire",
                    validateCode: lesson.exercise.validateCode ?? null,
                  },
                }
              : undefined,
            quizzes: {
              create: (lesson.quizzes || []).map((quiz) => ({
                question: quiz.question ?? null,
                options: quiz.options ?? [],
                correctAnswer: quiz.correctAnswer ?? null,
              })),
            },
          })),
        },
      },
      include: {
        lessons: {
          include: {
            exercise: true,
            quizzes: true,
          },
        },
      },
    });

    // Revalidation ISR (sans await)
    revalidatePath("/courses");
    revalidatePath(`/courses/${createdCourse.slug}`);
    for (const lesson of createdCourse.lessons) {
      revalidatePath(`/courses/${createdCourse.slug}/lessons/${lesson.slug}`);
    }

    return NextResponse.json({ course: createdCourse }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du cours :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du cours" },
      { status: 500 }
    );
  }
}
