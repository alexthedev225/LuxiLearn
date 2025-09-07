"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Lesson {
  id: string | number;
  slug: string;
  title: string;
  description?: string;
  duration?: string;
}

interface Course {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
  lessons: Lesson[];
  slug: string;
}

const LessonCard = ({
  lesson,
  index,
  courseSlug,
}: {
  lesson: Lesson;
  index: number;
  courseSlug: string;
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-2 border-black dark:border-white bg-white dark:bg-neutral-950 p-2 sm:p-3 transition-all duration-200 hover:border-red-600 hover:-translate-y-0.5 rounded"
    >
      <Link
        href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
        className="block w-full h-full"
        aria-label={`Ouvrir la leçon ${lesson.title}`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div
            className="text-sm sm:text-base font-black tracking-wide text-neutral-900 dark:text-neutral-100"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            {index + 1}. {lesson.title.toUpperCase()}
          </div>
          {lesson.duration && (
            <span className="text-xs font-bold text-red-600">
              {lesson.duration}
            </span>
          )}
        </div>

        {/* Description */}
        {lesson.description && (
          <p
            className="text-2xs sm:text-xs text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3 line-clamp-1"
            style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)" }}
          >
            {lesson.description}
          </p>
        )}

        {/* Status */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
            NON COMMENCÉ
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ClientCoursePage({ course }: { course: Course }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-4 sm:p-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚠️</div>
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide mb-2 sm:mb-3"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
          >
            COURS INTROUVABLE
          </h2>
          <p
            className="text-xs sm:text-sm font-bold"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Ce cours n’existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen  text-neutral-900 dark:text-neutral-100  ">
      {/* Navigation */}
      <nav className="mb-4 sm:mb-6">
        <div className="flex items-center gap-1 text-2xs sm:text-xs font-bold">
          <Link
            href="/courses"
            className="hover:text-red-600 transition-colors duration-200 px-1 py-0.5"
            aria-label="Retour aux parcours"
            aria-current="page"
          >
            PARCOURS
          </Link>

          <span>→</span>
          <span>{course.title.toUpperCase()}</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide mb-2 sm:mb-3"
          style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
        >
          {course.title.toUpperCase()}
        </h1>
        <p
          className="text-xs sm:text-sm mb-4 sm:mb-6 max-w-md sm:max-w-2xl"
          style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
        >
          {course.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
          {course.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 border-2 border-black dark:border-white text-xs sm:text-sm font-bold hover:bg-red-600 hover:text-white transition-all duration-200 rounded"
            >
              {tech.toUpperCase()}
            </span>
          ))}
        </div>

        <Link
          href={`/courses/${course.slug}/lessons/${course.lessons[0]?.slug}`}
          className="inline-block px-3 py-1.5 bg-red-600 text-white font-black text-xs sm:text-sm tracking-wide border-2 border-black dark:border-white transition-all duration-200 hover:-translate-y-0.5 rounded"
          aria-label={`Commencer la première leçon de ${course.title}`}
        >
          PREMIÈRE LEÇON
        </Link>
      </header>

      {/* Lessons */}
      <section>
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
        <h2
          className="text-lg sm:text-xl md:text-2xl font-black tracking-wide mb-4 sm:mb-6"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          PROGRAMME
        </h2>
        <div className="grid grid-cols-1  gap-2 sm:gap-4">
          {course.lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              courseSlug={course.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
