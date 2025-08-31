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


export default function ClientLessonContent({ course, lesson }: Props) {
  const [quizValidated, setQuizValidated] = useState(false);

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
  setQuizValidated(true); // <- bouton disparaît après clic
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

const canProceed =
  allQuizAnswered &&
  quizValidated && // <- le quiz a été validé
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
          <div className="h-0.5 sm:h-1 bg-gray-400 w-8 sm:w-12 mb-2 sm:mb-3 rounded-full" />
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
                  <div className="relative flex items-center gap-2 my-2 sm:my-3 bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-gray-300 dark:border-neutral-600 p-2 rounded">
                    <span className="w-5 h-5 flex items-center justify-center bg-gray-300 dark:bg-neutral-600 text-xs font-black rounded-full">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-black tracking-wide">
                      {q.question}
                    </span>
                    {isAnswered && (
                      <span className="absolute top-1 sm:top-2 right-2 font-black text-xs sm:text-sm">
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                  <div className="h-0.5 sm:h-1 bg-gray-300 mb-1 sm:mb-2 rounded-full" />
                  <ul className="space-y-1">
                    {q.options.map((opt, oIdx) => (
                      <li key={oIdx}>
                        <label
                          className={`flex items-center gap-2 p-2 bg-white dark:bg-neutral-950 border border-gray-300 dark:border-neutral-600 rounded ${
                            !isAnswered
                              ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                              : oIdx === q.correctAnswer
                                ? "border-green-500"
                                : oIdx === userAnswer
                                  ? "opacity-50 line-through"
                                  : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`quiz-${idx}`}
                            onChange={() => handleAnswer(idx, oIdx)}
                            checked={userAnswer === oIdx}
                            disabled={isAnswered}
                            className="w-3 h-3 accent-gray-700"
                            aria-label={`Option ${oIdx + 1}: ${opt}`}
                          />
                          <span className="text-xs sm:text-sm font-bold">
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
      {!quizValidated && (
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
            className={`px-4 py-2 font-black text-sm border rounded-md tracking-wide transition-transform duration-200 ${
              !allQuizAnswered
                ? "bg-neutral-400 border-neutral-400 cursor-not-allowed opacity-50"
                : "bg-neutral-700 text-white border-neutral-700 hover:-translate-y-0.5 hover:bg-neutral-800"
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
