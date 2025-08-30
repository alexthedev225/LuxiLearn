// api/admin/courses/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Typages
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

interface CourseUpdateBody {
  title?: string;
  description?: string;
  level?: string;
  duration?: string;
  technologies?: string[];
  lessons?: Lesson[];
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const formData = await request.formData();
    const courseRaw = formData.get("course");
    if (!courseRaw) {
      return NextResponse.json(
        { error: "Champ course manquant" },
        { status: 400 }
      );
    }
    const course: CourseUpdateBody = JSON.parse(courseRaw.toString());

    // Gestion technologies
    let technologies: string[] = [];
    if (Array.isArray(course.technologies)) {
      technologies = course.technologies;
    } else if (typeof course.technologies === "string") {
      try {
        technologies = JSON.parse(course.technologies);
        if (!Array.isArray(technologies)) throw new Error();
      } catch {
        return NextResponse.json(
          { error: "Format technologies invalide" },
          { status: 400 }
        );
      }
    }

    // Préparer données simples à mettre à jour
    const updateData: any = {
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      technologies,
    };

    // Gestion des leçons avec exercises et quizzes
    if (course.lessons && course.lessons.length > 0) {
      updateData.lessons = {
        upsert: course.lessons.map((lesson) => ({
          where: { slug: lesson.slug },
          update: {
            title: lesson.title ?? "",
            description: lesson.description ?? "",
            duration: lesson.duration ?? "",
            content: lesson.content ?? "",
            exercise: lesson.exercise
              ? {
                  upsert: {
                    create: {
                      title: lesson.exercise.title ?? "Titre temporaire",
                      prompt: lesson.exercise.prompt ?? "Prompt temporaire",
                      solution:
                        lesson.exercise.solution ?? "Solution temporaire",
                      validateCode: lesson.exercise.validateCode ?? null,
                    },
                    update: {
                      title: lesson.exercise.title ?? "Titre temporaire",
                      prompt: lesson.exercise.prompt ?? "Prompt temporaire",
                      solution:
                        lesson.exercise.solution ?? "Solution temporaire",
                      validateCode: lesson.exercise.validateCode ?? null,
                    },
                  },
                }
              : undefined,
            quizzes: {
              deleteMany: {}, // supprime les anciens quizzes
              create: (lesson.quizzes || []).map((quiz) => ({
                question: quiz.question ?? null,
                options: quiz.options ?? [],
                correctAnswer: quiz.correctAnswer ?? null,
              })),
            },
          },
          create: {
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
          },
        })),
      };
    }

    const updatedCourse = await prisma.course.update({
      where: { slug },
      data: updateData,
      include: { lessons: { include: { exercise: true, quizzes: true } } },
    });

    // Revalidation ISR
    revalidatePath("/courses");
    revalidatePath(`/courses/${slug}`);
    for (const lesson of updatedCourse.lessons) {
      revalidatePath(`/courses/${slug}/lessons/${lesson.slug}`);
    }

    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    console.error("Erreur update course :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du cours" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await prisma.course.delete({
      where: { slug },
    });

    revalidatePath("/courses");
    revalidatePath(`/courses/${slug}`);

    return NextResponse.json({ message: "Cours supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression course :", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du cours" },
      { status: 500 }
    );
  }
}
