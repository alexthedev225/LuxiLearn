// app/admin/courses/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminCourseClient from "./AdminCourseClient";

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const course = await prisma.course.findUniqueOrThrow({
      where: { slug },
      include: {
        lessons: {
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

    return <AdminCourseClient course={course} />;
  } catch (error) {
    return notFound();
  }
}

