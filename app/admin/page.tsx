import AdminDashboardPageClient from "./AdminDashboardPageClient";
import { prisma } from "@/lib/prisma";

async function getAdminCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        lessons: {
          orderBy: { createdAt: "asc" }, // trier les leçons par date de création
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            duration: true, // ou autre champ pertinent
          },
        },
      },
    });

    const totalCourses = await prisma.course.count();
    const totalLessons = await prisma.lesson.count();

    return { courses, totalCourses, totalLessons };
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
    return { courses: [], totalCourses: 0, totalLessons: 0 };
  }
}

export default async function AdminDashboardPage() {
  const { courses, totalCourses, totalLessons } = await getAdminCourses();

  return (
    <AdminDashboardPageClient
      courses={courses}
      totalCourses={totalCourses}
      totalLessons={totalLessons}
    />
  );
}
