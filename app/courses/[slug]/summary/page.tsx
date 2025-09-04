import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CourseSummaryClient from "./CourseSummaryClient";

interface Lesson {
  id: number;
  slug: string;
  title: string;
  createdAt: string; // iso string
  updatedAt: string; // iso string
}

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
  createdAt: string; // iso string
  updatedAt: string; // iso string
  lessons: Lesson[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CourseSummaryPage({ params }: Props) {
  const { slug } = await params;

  const courseFromDb = await prisma.course.findUnique({
    where: { slug },
    include: {
      lessons: true,
    },
  });

  if (!courseFromDb) return notFound();

  const safeCourse: Course = {
    ...courseFromDb,
    createdAt: courseFromDb.createdAt.toISOString(),
    updatedAt: courseFromDb.updatedAt.toISOString(),
    lessons: courseFromDb.lessons.map((lesson) => ({
      ...lesson,
      createdAt: lesson.createdAt.toISOString(),
      updatedAt: lesson.updatedAt.toISOString(),
    })),
  };

  return <CourseSummaryClient course={safeCourse} />;
}
