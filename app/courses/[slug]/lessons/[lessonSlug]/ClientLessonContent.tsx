"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import rehypeHighlight from "rehype-highlight";
import confetti from "canvas-confetti";
import ExerciseInteractive from "./ExerciseInteractive";
import { useProgressStore } from "@/stores/useProgressStore";
import type { Course, Lesson } from "./types";
type Props = {
  course: Course;
  lesson: Lesson;
};
type ValidationResult = true | string | { success: boolean; message?: string };

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

export default function ClientLessonContent({ course, lesson }: Props) {
  const { setLessonProgress, getLessonProgress } = useProgressStore();
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [validateFn, setValidateFn] = useState<
    ((args: { code: string }) => ValidationResult) | null
  >(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const safeFunctionFromString = (
    fnString: string
  ): ((args: { code: string }) => ValidationResult) | null => {
    try {
      const fn = new Function(`return (${fnString})`)();
      if (typeof fn === "function") return fn;
      return null;
    } catch (err) {
      console.error(
        "Erreur lors de la création de la fonction de validation :",
        err
      );
      return null;
    }
  };

  useEffect(() => {
    if (!lesson) return;
    const savedProgress = getLessonProgress(course.slug, lesson.slug);
    if (savedProgress) {
      setAnswers(savedProgress.answersHistory);
    } else if (lesson.quizzes && lesson.quizzes.length > 0) {
      setAnswers(new Array(lesson.quizzes.length).fill(undefined));
    }
  }, [lesson, getLessonProgress, course.slug]);

  useEffect(() => {
    if (lesson?.exercise?.validateCode) {
      const fn = safeFunctionFromString(lesson.exercise.validateCode);
      setValidateFn(() => fn);
    } else {
      setValidateFn(null);
    }
  }, [lesson]);

  const handleValidateQuiz = () => {
    if (!lesson || !lesson.quizzes) return;

    const calculatedScore = answers.reduce<number>((acc, answer, idx) => {
      if (answer === undefined) return acc;
      return answer === lesson.quizzes![idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    const errorCount = answers.reduce<number>((acc, answer, idx) => {
      if (answer === undefined) return acc;
      return answer !== lesson.quizzes![idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    if (errorCount === 0) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }

    setLessonProgress(course.slug, lesson.slug, {
      score: calculatedScore,
      totalQuestions: lesson.quizzes.length,
      errorCount,
      completed: true,
      answersHistory: answers,
    });

    setScore(calculatedScore);
    setShowScore(true);
  };

  const handleAnswer = (quizIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[quizIndex] = optionIndex;
      return newAnswers;
    });
  };

  function dedent(str: string): string {
    const lines = str.split("\n");
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
    const indentLengths = lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.match(/^(\s*)/)![1].length);
    const minIndent = Math.min(...indentLengths);
    return lines.map((line) => line.slice(minIndent)).join("\n");
  }

  if (!lesson) return null;

  const currentLessonIndex = Array.isArray(course.lessons)
    ? course.lessons.findIndex((l) => l.slug === lesson.slug)
    : -1;
  const unescapeBackticks = (str: string) => str.replace(/\\`/g, "`");
  const nextLesson =
    currentLessonIndex !== -1 && currentLessonIndex < course.lessons.length - 1
      ? course.lessons[currentLessonIndex + 1]
      : null;

  const allQuizAnswered = lesson.quizzes
    ? answers.length === lesson.quizzes.length &&
      answers.every((a) => a !== undefined)
    : true;
  const allQuizCorrect = lesson.quizzes
    ? answers.every((a, i) => a === lesson.quizzes![i].correctAnswer)
    : true;
  const canProceed =
    allQuizAnswered &&
    allQuizCorrect &&
    (!lesson.exercise || exerciseCompleted);

  return (
    <div className="min-h-screen max-w-4xl mx-auto  text-neutral-900 dark:text-neutral-100 py-32 px-4 sm:px-6">
      {/* Header & Navigation */}
      <section className="mb-6 sm:mb-8">
        <nav className="mb-4 sm:mb-6">
          <div className="flex items-center gap-1 text-2xs sm:text-xs font-bold uppercase tracking-wide">
            <NextLink
              href={`/courses/${course.slug}`}
              className="hover:text-red-600 transition-transform duration-200 px-1 py-0.5"
              aria-label="Retour au cours"
              aria-current="page"
            >
              {course.title.toUpperCase()}
            </NextLink>
            <span>→</span>
            <span>LEÇON</span>
          </div>
        </nav>

        <header className="mb-4 sm:mb-6">
          <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase mb-2 sm:mb-3"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
          >
            {lesson.title}
          </h1>
          <p
            className="text-xs sm:text-sm mb-2 sm:mb-3 max-w-md sm:max-w-lg"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            {lesson.description}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="inline-block border-2 border-black dark:border-white px-2 py-0.5 font-bold text-xs sm:text-sm uppercase rounded">
              Durée : {lesson.duration}
            </div>
            <div className="inline-block border-2 border-black dark:border-white px-2 py-0.5 font-bold text-xs sm:text-sm uppercase rounded">
              Cours : {course.title}
            </div>
          </div>
        </header>
      </section>

      {/* Contenu Markdown */}
      <section className="mb-6 sm:mb-8">
        <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
        <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {unescapeBackticks(dedent(lesson.content))}
          </ReactMarkdown>
        </div>
      </section>

      {/* Exercise */}
      {lesson.exercise && (
        <section className="mb-6 sm:mb-8">
          <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
          <ExerciseInteractive
            prompt={lesson.exercise.prompt}
            solution={lesson.exercise.solution}
            validate={validateFn ?? undefined}
            onValidateSuccess={() => setExerciseCompleted(true)}
          />
        </section>
      )}

      {/* Quiz */}
      {lesson.quizzes && lesson.quizzes.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mb-2 sm:mb-3" />
          <h2
            className="text-base sm:text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            QUIZ • {lesson.quizzes.length} QUESTION
            {lesson.quizzes.length > 1 ? "S" : ""}
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
            {lesson.quizzes.map((q, idx) => {
              const userAnswer = answers[idx];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={idx}>
                  <div className="relative flex items-center gap-1 sm:gap-2 my-2 sm:my-3 bg-red-600 text-white border-2 border-black dark:border-white p-1.5 sm:p-2 rounded">
                    <span className="w-4 h-4 flex items-center justify-center bg-red-600 text-white font-black border-2 border-black dark:border-white text-xs">
                      {idx + 1}
                    </span>
                    <span
                      className="text-sm sm:text-base font-black tracking-wide"
                      style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
                    >
                      {q.question}
                    </span>
                    {isAnswered && (
                      <span className="absolute top-1 sm:top-2 right-2 font-black text-xs sm:text-sm text-white">
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                  <div className="h-0.5 sm:h-1 bg-red-600 mb-1 sm:mb-2" />
                  <ul className="space-y-1">
                    {q.options.map((opt, oIdx) => (
                      <li key={oIdx}>
                        <label
                          className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-white dark:bg-neutral-950 border-2 ${
                            !isAnswered
                              ? "border-black dark:border-white cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                              : oIdx === q.correctAnswer
                                ? "border-red-600"
                                : oIdx === userAnswer
                                  ? "border-black dark:border-white opacity-50 line-through"
                                  : "border-black dark:border-white"
                          } rounded`}
                        >
                          <input
                            type="radio"
                            name={`quiz-${idx}`}
                            onChange={() => handleAnswer(idx, oIdx)}
                            checked={userAnswer === oIdx}
                            disabled={isAnswered}
                            className="w-2.5 h-2.5 accent-red-600"
                            aria-label={`Option ${oIdx + 1}: ${opt}`}
                          />
                          <span
                            className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100"
                            style={{
                              fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                            }}
                          >
                            {opt}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Valider Quiz */}
      {!allQuizCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <button
            disabled={!allQuizAnswered}
            onClick={handleValidateQuiz}
            className={`px-3 py-1.5 font-black text-xs sm:text-sm border-2 uppercase tracking-wide rounded ${
              !allQuizAnswered
                ? "border-black dark:border-white opacity-50 cursor-not-allowed"
                : "border-red-600 bg-red-600 text-white transition-transform duration-200 hover:-translate-y-0.5"
            }`}
            aria-label="Valider le quiz"
          >
            Valider
          </button>
        </motion.div>
      )}

      {/* Score */}
      {showScore && lesson.quizzes && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="border-2 border-black dark:border-white p-2 sm:p-3 mb-6 sm:mb-8 text-center rounded"
        >
          <Separator />
          <div className="h-0.5 sm:h-1 bg-red-600 w-8 sm:w-12 mx-auto mb-2 sm:mb-3" />
          <h3
            className="text-base sm:text-lg font-black uppercase mb-1 sm:mb-2"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            🎉 Quiz terminé !
          </h3>
          <p
            className="text-xs sm:text-sm font-bold"
            style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)" }}
          >
            Score : {score} / {lesson.quizzes.length}
          </p>
        </motion.section>
      )}

      {/* Bouton Leçon suivante / Résumé */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="flex justify-end gap-1 sm:gap-2 mb-6 sm:mb-8"
      >
        {canProceed && nextLesson && (
          <NextLink
            href={`/courses/${course.slug}/lessons/${nextLesson.slug}`}
            className="px-3 py-1.5 border-2 border-red-600 bg-red-600 text-white font-black text-xs sm:text-sm uppercase transition-transform duration-200 hover:-translate-y-0.5 rounded"
            aria-label={`Aller à la leçon suivante : ${nextLesson.title}`}
          >
            Suivante
          </NextLink>
        )}
        {canProceed && !nextLesson && (
          <NextLink
            href={`/courses/${course.slug}/summary`}
            className="px-3 py-1.5 border-2 border-red-600 bg-red-600 text-white font-black text-xs sm:text-sm uppercase transition-transform duration-200 hover:-translate-y-0.5 rounded"
            aria-label="Voir le résumé du cours"
          >
            Résumé
          </NextLink>
        )}
      </motion.section>
    </div>
  );
}
