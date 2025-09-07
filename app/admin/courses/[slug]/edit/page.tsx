// app/admin/courses/[slug]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCourseClient from "@/components/admin/EditCourseClient";

interface Params {
  slug: string;
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) return notFound();

  return <EditCourseClient course={course} />;
}
