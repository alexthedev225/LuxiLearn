// api/admin/lessons/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: Number(id) },
      include: {
        course: { select: { id: true, title: true, slug: true } },
        exercise: true,
        quizzes: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Leçon non trouvée" }, { status: 404 });
    }

    return NextResponse.json({ lesson });
  } catch (error) {
    console.error("Erreur récupération leçon :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    // Nettoyage : ne jamais passer lessonId ou id dans create/update
    const exerciseData = body.exercise
      ? {
          upsert: {
            create: {
              title: body.exercise.title,
              prompt: body.exercise.prompt,
              solution: body.exercise.solution,
              validateCode: body.exercise.validateCode || null,
            },
            update: {
              title: body.exercise.title,
              prompt: body.exercise.prompt,
              solution: body.exercise.solution,
              validateCode: body.exercise.validateCode || null,
            },
          },
        }
      : undefined;

    const quizzesData = body.quizzes
      ? {
          deleteMany: {},
          create: body.quizzes.map((quiz: any) => ({
            question: quiz.question,
            options: quiz.options || [],
            correctAnswer: quiz.correctAnswer ?? null,
          })),
        }
      : undefined;

    const updatedLesson = await prisma.lesson.update({
      where: { id: Number(id) }, // id doit correspondre au @id
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        slug: body.slug,
        content: body.content,
        exercise: exerciseData,
        quizzes: quizzesData,
      },
      include: { exercise: true, quizzes: true, course: true },
    });

    // Revalidation des pages
    revalidatePath(`/courses/${updatedLesson.course.slug}`);
    revalidatePath(
      `/courses/${updatedLesson.course.slug}/lessons/${updatedLesson.slug}`
    );

    return NextResponse.json({ lesson: updatedLesson });
  } catch (error) {
    console.error("Erreur update leçon :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la leçon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const deletedLesson = await prisma.lesson.delete({
      where: { id: Number(id) },
      include: { course: true },
    });

    revalidatePath(`/courses/${deletedLesson.course.slug}`);

    return NextResponse.json({ message: "Leçon supprimée avec succès." });
  } catch (error) {
    console.error("Erreur suppression leçon :", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la leçon" },
      { status: 500 }
    );
  }
}
