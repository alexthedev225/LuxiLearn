"use client";

import { useState, useEffect, useRef } from "react";
import { useProgressStore } from "@/stores/useProgressStore";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";

interface Lesson {
  slug: string;
  title: string;
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
interface LessonProgress {
  lessonSlug: string;
  title: string;
  score: number;
  totalQuestions: number;
  errorCount: number;
  completed: boolean;
}
interface Props {
  course: Course;
}

const Separator = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.15 }}
    viewport={{ once: true }}
    className="w-full h-px sm:h-0.5 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-4xl mx-auto"
    aria-hidden="true"
  />
);

const ProgressCard = ({
  progress,
  index,
  courseSlug,
}: {
  progress: LessonProgress;
  index: number;
  courseSlug: string;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const scorePercent =
    progress.totalQuestions > 0
      ? (progress.score / progress.totalQuestions) * 100
      : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
      aria-label={`Progrès de la leçon ${progress.title}`}
    >
      <motion.div
        whileHover={{ translateY: -0.5 }}
        className="relative bg-white dark:bg-neutral-950 border-2 border-black dark:border-white p-2 sm:p-3 transition-transform duration-200 rounded"
      >
        {/* Score Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-0.5 rounded text-2xs sm:text-xs font-bold text-red-600 border-2 border-red-600">
          {scorePercent.toFixed(0)}%
        </div>

        {/* Content */}
        <div className="pr-8 sm:pr-10">
          <h3
            className="text-base sm:text-lg font-black tracking-wide uppercase text-neutral-900 dark:text-neutral-100 mb-1 sm:mb-2"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            {progress.title}
          </h3>

          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <span aria-hidden="true">🎯</span>
              <span>
                Score: {progress.score}/{progress.totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span aria-hidden="true">❌</span>
              <span>{progress.errorCount}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 h-1 sm:h-1.5 bg-black dark:bg-white rounded overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: `${scorePercent}%` }}
                className="h-full bg-red-600"
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-2xs sm:text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {progress.completed ? "TERMINÉ" : "EN COURS"}
            </span>
          </div>
        </div>

        {/* Left accent line */}
        <div className="absolute left-0 top-2 sm:top-3 bottom-2 sm:bottom-3 w-0.5 sm:w-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </motion.div>
    </motion.div>
  );
};

export default function CourseSummaryClient({ course }: Props) {
  const router = useRouter();
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const getLessonProgress = useProgressStore(
    (state) => state.getLessonProgress
  );
  const resetCourseProgress = useProgressStore(
    (state) => state.resetCourseProgress
  );

  const [lessonProgresses, setLessonProgresses] = useState<LessonProgress[]>(
    []
  );
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (!course?.lessons) return;
    const progresses: LessonProgress[] = course.lessons.map((lesson) => {
      const progress = getLessonProgress(course.slug, lesson.slug);
      return {
        lessonSlug: lesson.slug,
        title: lesson.title,
        score: progress?.score ?? 0,
        totalQuestions: progress?.totalQuestions ?? 0,
        errorCount: progress?.errorCount ?? 0,
        completed: progress?.completed ?? false,
      };
    });
    setLessonProgresses(progresses);
  }, [course, getLessonProgress]);

  const totalQuestions = lessonProgresses.reduce(
    (acc, p) => acc + p.totalQuestions,
    0
  );
  const totalScore = lessonProgresses.reduce((acc, p) => acc + p.score, 0);
  const totalErrors = lessonProgresses.reduce(
    (acc, p) => acc + p.errorCount,
    0
  );
  const lessonsCompleted = lessonProgresses.filter((p) => p.completed).length;
  const totalLessons = course.lessons.length;
  const globalScorePercent =
    totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

  useEffect(() => {
    if (globalScorePercent === 100) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    }
  }, [globalScorePercent]);

  const handleRestart = () => {
    resetCourseProgress(course.slug);
    if (course.lessons[0]) {
      router.push(`/courses/${course.slug}/lessons/${course.lessons[0].slug}`);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  useEffect(() => setHasHydrated(true), []);
  if (!hasHydrated) return null;

  return (
    <div className="max-w-4xl mx-auto min-h-screen text-neutral-900 dark:text-neutral-100 py-6 sm:py-32 px-4 sm:px-6">
      {/* Header */}
      <motion.section
        ref={headerRef}
        style={{ opacity, y }}
        className="py-6 sm:pb-8"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          RÉSUMÉ
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.25rem)" }}
        >
          {course.title}
        </p>

        {/* Global Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 border-2 border-black dark:border-white text-center font-bold uppercase text-xs sm:text-sm rounded">
            Leçons: {lessonsCompleted}/{totalLessons}
          </div>
          <div className="p-2 sm:p-3 border-2 border-black dark:border-white text-center font-bold uppercase text-xs sm:text-sm rounded">
            Score: {totalScore}/{totalQuestions}
          </div>
          <div className="p-2 sm:p-3 border-2 border-black dark:border-white text-center font-bold uppercase text-xs sm:text-sm rounded">
            Erreurs: {totalErrors}
          </div>
          <div className="p-2 sm:p-3 border-2 border-black dark:border-white text-center font-bold uppercase text-xs sm:text-sm rounded">
            Total: {globalScorePercent.toFixed(0)}%
          </div>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          <button
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="px-2 py-1 sm:px-3 sm:py-1.5 border-2 border-black dark:border-white bg-white dark:bg-neutral-950 font-bold uppercase tracking-wide text-xs sm:text-sm hover:-translate-y-0.5 transition-transform duration-200 rounded"
            aria-label="Retour au cours"
          >
            ← Cours
          </button>
          <button
            onClick={handleRestart}
            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-600 text-white font-bold uppercase tracking-wide border-2 border-red-600 text-xs sm:text-sm hover:-translate-y-0.5 transition-transform duration-200 rounded"
            aria-label="Recommencer le cours"
          >
            Rejouer
          </button>
        </div>
      </motion.section>

      <Separator />

      {/* Lesson Progress */}
      <section className="py-6 sm:py-8">
        <div className="space-y-2 sm:space-y-3">
          <AnimatePresence>
            {lessonProgresses.map((progress, index) => (
              <div key={progress.lessonSlug}>
                <ProgressCard
                  progress={progress}
                  index={index}
                  courseSlug={course.slug}
                />
                {index < lessonProgresses.length - 1 && <Separator />}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
