// app/admin/lessons/page.tsx
import { prisma } from "@/lib/prisma";
import LessonsTable from "@/components/admin/LessonsTable";

interface Course {
  id: number;
  title: string;
  slug: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  slug: string;
  course: Course;
}

export default async function LessonsAdmin() {
  try {
    // Récupérer les leçons
    const lessons = await prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        slug: true,
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Récupérer les cours
    const courses = await prisma.course.findMany({
      select: { id: true, title: true, slug: true },
    });

    return <LessonsTable lessons={lessons} courses={courses} />;
  } catch (error) {
    console.error("Erreur récupération données :", error);
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg">
            Erreur lors du chargement des leçons
          </p>
        </div>
      </div>
    );
  }
}
