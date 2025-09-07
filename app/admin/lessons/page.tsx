// app/admin/lessons/page.tsx
import { prisma } from "@/lib/prisma";
import LessonsTable from "@/components/admin/LessonsTable";

interface Course {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  course: Course;
}

export default async function LessonsAdmin() {
  try {
    // Récupérer les leçons
    const lessonsRaw = await prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Convertir les IDs en string pour matcher le type côté client
    const lessons: Lesson[] = lessonsRaw.map((l) => ({
      id: String(l.id),
      title: l.title,
      duration: l.duration ?? "",
      course: { id: String(l.course.id), title: l.course.title },
    }));

    // Récupérer les cours
    const coursesRaw = await prisma.course.findMany({
      select: { id: true, title: true },
    });

    const courses: Course[] = coursesRaw.map((c) => ({
      id: String(c.id),
      title: c.title,
    }));

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
