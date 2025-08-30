import AdminCoursesPageClient from "./AdminCoursesPageClient";
import { prisma } from "@/lib/prisma";

async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        lessons: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            duration: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
    return [];
  }
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return <AdminCoursesPageClient courses={courses} />;
}
