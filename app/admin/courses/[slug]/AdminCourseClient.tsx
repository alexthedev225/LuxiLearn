"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Lesson {
  id: string | number;
  slug: string;
  title: string;
  description?: string;
  duration?: string;
  createdAt: Date;
}

interface AdminCourse {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  lessons?: Lesson[];
}

const LessonCardAdmin = ({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
  courseSlug: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white dark:bg-black border-2 border-black dark:border-white p-8 mb-6 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1">
        <div className="h-1 w-16 bg-red-600 mb-4" />
        <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-black dark:text-white">
          {lesson.title}
        </h3>
        {lesson.duration && (
          <div className="flex items-center gap-2 text-black dark:text-white font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function AdminCourseClient({ course }: { course: AdminCourse }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const headerRef = useRef(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-black dark:text-white">
        Cours introuvable
      </div>
    );

  const getLevelData = (level: string) => {
    switch (level.toLowerCase()) {
      case "débutant":
      case "beginner":
        return {
          color: "text-black dark:text-white",
          border: "border-black dark:border-white",
          icon: "🌱",
        };
      case "intermédiaire":
      case "intermediate":
        return {
          color: "text-black dark:text-white",
          border: "border-black dark:border-white",
          icon: "⚡",
        };
      case "avancé":
      case "advanced":
        return {
          color: "text-red-600",
          border: "border-black dark:border-white",
          icon: "🚀",
        };
      default:
        return {
          color: "text-black dark:text-white",
          border: "border-black dark:border-white",
          icon: "📘",
        };
    }
  };

  const levelData = getLevelData(course.level);

  return (
    <div className="max-w-6xl mx-auto min-h-screen text-black dark:text-white relative ">
      {/* Header */}
      <section ref={headerRef} className="mb-12">
        <nav className="mb-6 flex items-center gap-2 uppercase font-bold tracking-wide">
          <button
            onClick={() => router.push("/admin/courses")}
            className="text-black dark:text-white hover:text-red-600 transition duration-200"
          >
            ADMINISTRATION DES PARCOURS
          </button>
          <span>→</span>
          <span className="text-black dark:text-white">{course.title}</span>
        </nav>

        <div className="mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 border-2 ${levelData.border} ${levelData.color}`}
          >
            <span>{levelData.icon}</span>
            {course.level}
          </div>

          <h1 className="text-5xl font-black uppercase tracking-wide mt-4 mb-4 text-black dark:text-white">
            {course.title}
          </h1>
          <p className="text-2xl font-bold mb-6 text-black dark:text-white">
            {course.description}
          </p>

          <div className="flex gap-6 mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-3 border-2 border-black dark:border-white text-black dark:text-white">
              {course.lessons?.length ?? 0} leçon
              {course.lessons?.length !== 1 ? "s" : ""}
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-3 border-2 border-black dark:border-white text-black dark:text-white">
              Durée: {course.duration}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {course.technologies.map((tech, i) => (
              <div
                key={i}
                className="px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white uppercase font-bold tracking-wide hover:translate-x-1 hover:translate-y-1 transition duration-200"
              >
                {tech}
              </div>
            ))}
          </div>

          <Link href={`/admin/courses/${course.slug}/edit`}>
            <button className="px-6 py-3 bg-red-600 text-white font-black border-2 border-black dark:border-white uppercase tracking-wide transition-transform duration-200 hover:scale-102 hover:translate-x-1 hover:translate-y-1">
              Modifier le parcours
            </button>
          </Link>
        </div>
      </section>

      {/* Lessons */}
      <section className="grid gap-6">
        <AnimatePresence>
          {course.lessons?.map((lesson, index) => (
            <LessonCardAdmin
              key={lesson.id}
              lesson={lesson}
              index={index}
              courseSlug={course.slug}
            />
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}
