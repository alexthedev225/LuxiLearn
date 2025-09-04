"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface Lesson {
  id: string | number;
  slug: string;
  title: string;
}

interface Course {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  level: string;
  duration: string;
  lessons: Lesson[];
  slug: string;
}

// Neo-Brutalist Separator
const Separator = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.15 }}
    viewport={{ once: true }}
    className="w-full h-px sm:h-0.5 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-6xl mx-auto"
    aria-hidden="true"
  />
);

const CourseModule = ({ course, index }: { course: Course; index: number }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative border-2 border-black dark:border-white bg-white dark:bg-neutral-950 p-2 sm:p-3 mb-4 sm:mb-6 transition-transform duration-200 hover:border-red-600 hover:-translate-y-0.5 rounded"
    >
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-red-600" />

      {/* Header */}
      <div className="mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-1 sm:mb-2">
          {course.title}
        </h3>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-xs font-bold text-red-600">{course.level}</span>
          <div className="text-right">
            <div className="text-2xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">
              Durée
            </div>
            <div className="text-sm font-black">{course.duration}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3">
        {course.description}
      </p>

      {/* Technologies */}
      <div className="mb-2 sm:mb-3">
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-10 mb-1 sm:mb-2" />
        <div className="text-2xs sm:text-xs font-bold uppercase mb-1 sm:mb-2">
          Technologies
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {course.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 border-2 border-black dark:border-white text-neutral-900 dark:text-neutral-100 font-bold text-2xs sm:text-xs uppercase transition-transform duration-200 hover:-translate-y-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-2 sm:mb-3">
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-10 mb-1 sm:mb-2" />
        <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2">
          <div className="p-1 sm:p-2 text-center flex-1">
            <div className="text-base sm:text-lg font-black text-red-600">
              {course.lessons.length}
            </div>
            <div className="text-2xs sm:text-xs font-bold uppercase">
              Leçons
            </div>
          </div>
          <div className="p-1 sm:p-2 text-center flex-1">
            <div className="text-base sm:text-lg font-black text-red-600">
              100%
            </div>
            <div className="text-2xs sm:text-xs font-bold uppercase">
              Gratuit
            </div>
          </div>
          <div className="p-1 sm:p-2 text-center flex-1">
            <div className="text-base sm:text-lg font-black text-red-600">
              4.9
            </div>
            <div className="text-2xs sm:text-xs font-bold uppercase">
              Note /5
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => router.push(`/courses/${course.slug}`)}
        className="w-full bg-red-600 text-white font-black py-1.5 px-3 text-xs sm:text-sm uppercase tracking-wide border-2 border-black dark:border-white transition-all duration-200 hover:-translate-y-0.5 rounded"
        aria-label={`Commencer le parcours ${course.title}`}
      >
        Commencer →
      </button>
    </motion.div>
  );
};

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4 sm:p-6 ">
        <div>
          <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎓</div>
          <h2
            className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide mb-2 sm:mb-3 text-neutral-900 dark:text-neutral-100"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Parcours en construction
          </h2>
          <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Revenez bientôt !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen text-neutral-900 dark:text-neutral-100  py-32 ">
      {/* Hero Section - Parcours */}
      <section className="mb-6 sm:mb-8">
        {/* Navigation */}
        <nav className="mb-4 sm:mb-6">
          <div className="flex items-center gap-1 text-2xs sm:text-xs font-bold">
            <button
              onClick={() => router.push("/")}
              className="hover:text-red-600 transition-colors duration-200 cursor-pointer px-1 py-0.5"
              aria-label="Retour à l'accueil"
            >
              ACCUEIL
            </button>
            <span>→</span>
            <span>PARCOURS</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide mb-2 sm:mb-3"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
          >
            Nos Parcours de <span className="text-red-600">Formation</span>
          </h1>
          <p
            className="text-xs sm:text-sm mb-4 sm:mb-6 max-w-md sm:max-w-lg"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Devenez expert avec des projets concrets.
          </p>
        </header>
      </section>

   
      {/* Courses */}
      <section className="space-y-4 sm:space-y-6">
        <AnimatePresence mode="wait">
          {courses.map((course, index) => (
            <div key={course.id}>
              <CourseModule course={course} index={index} />
              {index < courses.length - 1 && <Separator />}
            </div>
          ))}
        </AnimatePresence>
      </section>

   
      {/* CTA Bottom */}
      <div className="text-center mt-8 sm:mt-12  pt-4 sm:pt-6">
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mx-auto mb-2 sm:mb-3" />
        <h2
          className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide mb-2 sm:mb-3"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Passion → <span className="text-red-600">Expertise</span>
        </h2>
        <button
          className="bg-red-600 text-white font-black py-2 px-4 text-xs sm:text-sm uppercase tracking-wide border-2 border-black dark:border-white transition-all duration-200 hover:-translate-y-0.5 rounded"
          aria-label="Commencer maintenant"
        >
          Commencer →
        </button>
      </div>
    </div>
  );
}
