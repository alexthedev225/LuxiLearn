"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/stores/useProgressStore";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import NextLink from "next/link";

interface Lesson {
  slug: string;
  title: string;
  // autres propriétés possibles
}

interface Course {
  id: string | number;
  title: string;
  description: string;
  image: string | null;
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

export default function CourseSummaryClient({ course }: Props) {
  const router = useRouter();

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

    const progresses: LessonProgress[] = course.lessons.map(
      (lesson: Lesson) => {
        const progress = getLessonProgress(course.slug, lesson.slug);
        return {
          lessonSlug: lesson.slug,
          title: lesson.title,
          score: progress?.score ?? 0,
          totalQuestions: progress?.totalQuestions ?? 0,
          errorCount: progress?.errorCount ?? 0,
          completed: progress?.completed ?? false,
        };
      }
    );
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
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [globalScorePercent]);

  const renderFeedbackMessage = () => {
    if (globalScorePercent === 100) {
      return (
        <p className="text-green-500 font-semibold text-lg mt-4">
          🎉 Félicitations ! Tu as obtenu un score parfait. Excellent travail !
        </p>
      );
    }
    if (globalScorePercent >= 80) {
      return (
        <p className="text-blue-500 font-semibold text-lg mt-4">
          Très bon score ! Tu maîtrises bien ce cours.
        </p>
      );
    }
    if (globalScorePercent >= 50) {
      return (
        <p className="text-yellow-500 font-semibold text-lg mt-4">
          Tu progresses bien, continue à t'exercer pour t'améliorer.
        </p>
      );
    }
    return (
      <p className="text-red-500 font-semibold text-lg mt-4">
        Ne te décourage pas ! Reprends certaines leçons pour t'améliorer.
      </p>
    );
  };

  const handleRestart = () => {
    resetCourseProgress(course.slug);
    if (course.lessons[0]) {
      router.push(`/courses/${course.slug}/lessons/${course.lessons[0].slug}`);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark py-20 px-6">
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">
          Résumé du cours : {course.title}
        </h1>

        <Card className="mb-8 bg-content1 dark:bg-content1-dark border border-border rounded-xl">
          <CardBody className="p-6">
            <p className="mb-2">
              <strong>Leçons terminées :</strong> {lessonsCompleted} /{" "}
              {totalLessons}
            </p>
            <p className="mb-2">
              <strong>Questions répondues :</strong> {totalScore} /{" "}
              {totalQuestions}
            </p>
            <p className="mb-2">
              <strong>Nombre total d’erreurs :</strong> {totalErrors}
            </p>
            <p className="mb-4 text-green-600 font-semibold">
              Score global : {globalScorePercent.toFixed(2)}%
            </p>

            {renderFeedbackMessage()}
          </CardBody>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Détail par leçon
        </h2>

        {lessonProgresses.map((p: LessonProgress) => (
          <Card
            key={p.lessonSlug}
            className="mb-6 bg-content2 dark:bg-content2-dark border border-border rounded-lg"
          >
            <CardBody className="p-6 flex justify-between items-start ">
              <div className="flex flex-col gap-1 mb-8">
                <h3 className="font-semibold text-lg dark:text-white">
                  {p.title}
                </h3>
                <p
                  className={`text-sm ${
                    p.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.completed ? "Terminée" : "Non terminée"}
                </p>
              </div>

              <div className="flex gap-10 font-semibold text-foreground/90 dark:text-white/90">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">🎯</span>
                  <span>
                    Score : {p.score} / {p.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-600 text-xl">❌</span>
                  <span>Erreurs : {p.errorCount}</span>
                </div>
              </div>

              <div style={{ width: "48px" }} />
            </CardBody>
          </Card>
        ))}

        <section className="mt-8 flex justify-between">
          <Button
            as={NextLink}
            href={`/courses/${course.slug}`}
            className="bg-black text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-900 transition"
          >
            Retour au cours
          </Button>

          <Button
            onClick={handleRestart}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Recommencer le cours
          </Button>
        </section>
      </section>
    </div>
  );
}
