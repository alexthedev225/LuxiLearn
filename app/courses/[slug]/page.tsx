import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ClientCoursePage from "./ClientCoursePage";

const prisma = new PrismaClient();

export const revalidate = 3600; // ISR 1h

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: true },
  });

  if (!course) notFound();

  return <ClientCoursePage course={course} />;
}
