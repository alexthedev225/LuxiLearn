import { PrismaClient } from "@prisma/client";
import getCourses from "../data/courses/index.js"; // fonction async
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const readMarkdown = (slug, courseSlug) => {
  const filePath = path.join(
    process.cwd(),
    "data",
    "md",
    "lessons",
    courseSlug,
    `${slug}.md`
  );
  return fs.readFileSync(filePath, "utf-8");
};

async function main() {
  const courses = await getCourses(); // attendre la récupération des cours
  await prisma.quiz.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        level: course.level,
        technologies: course.technologies,
        slug: course.slug,
        duration: course.duration,
        image: course.image,
        lessons: {
          create: course.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            slug: lesson.slug,
            content: lesson.content ?? readMarkdown(lesson.slug, course.slug),
            exercise: lesson.exercise
              ? {
                  create: {
                    description: lesson.exercise.description,
                    starterCode: lesson.exercise.starterCode,
                    solutionCode: lesson.exercise.solutionCode,
                  },
                }
              : undefined,
            quizzes: lesson.quiz
              ? {
                  create: lesson.quiz.map((q) => ({
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                  })),
                }
              : undefined,
          })),
        },
      },
    });

    console.log(
      `Seed terminée pour le cours : ${course.title} (id: ${createdCourse.id})`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
