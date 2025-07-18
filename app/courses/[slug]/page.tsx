import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import NextLink from "next/link";

const prisma = new PrismaClient();

interface Lesson {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  duration: string;
}

interface Course {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  level: string;
  duration: string;
  lessons: Lesson[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  const course: Course | null = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: true },
  });

  if (!course) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark py-20 px-6">
      {/* Header Section */}
      <section className="relative max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 relative h-64 w-full rounded-2xl shadow-lg overflow-hidden">
            <Image
              src={course.image || "/placeholder.png"}
              alt={`Image du cours ${course.title}`}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
          <div className="lg:w-2/3">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 dark:text-white">
              {course.title}
            </h1>
            <p className="text-xl text-foreground/80 dark:text-white/80 mb-6">
              {course.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-200 text-red-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm text-foreground/70 dark:text-white/70 mb-6">
              <span>Niveau: {course.level}</span>
              <span>Durée: {course.duration}</span>
              <span>{course.lessons.length} leçons</span>
            </div>
            <Button
              as={NextLink}
              href={`/courses/${course.slug}/lessons/${course.lessons[0].slug}`}
              className="bg-red-600 text-primary-foreground font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              Commencer la première leçon
            </Button>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">Leçons</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className="group bg-content1 dark:bg-content1-dark border border-border rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <CardHeader className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold dark:text-white">
                  {index + 1}. {lesson.title}
                </h3>
                <span className="text-sm text-foreground/70 dark:text-white/70">
                  {lesson.duration}
                </span>
              </CardHeader>
              <CardBody className="p-4 pt-0">
                <p className="text-foreground/80 dark:text-white/80 text-sm">
                  {lesson.description}
                </p>
                <Button
                  as={NextLink}
                  href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                  className="mt-4 bg-red-600 text-primary-foreground font-semibold hover:bg-red-700 transition-all duration-300"
                  size="sm"
                >
                  Accéder à la leçon
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
