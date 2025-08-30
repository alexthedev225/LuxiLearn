// app/admin/courses/[slug]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCourseClient from "@/components/admin/EditCourseClient";

export default async function EditCoursePage({ params }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });

  if (!course) return notFound();

  return <EditCourseClient course={course} />;
}
