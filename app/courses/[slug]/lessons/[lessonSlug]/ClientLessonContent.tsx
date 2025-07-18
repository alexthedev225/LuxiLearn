"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import confetti from "canvas-confetti";
import ExerciseInteractive from "./ExerciseInteractive";
import { useProgressStore } from "@/stores/useProgressStore";
import type { Course, Lesson } from "./types";
import { usePathname } from "next/navigation";

type Props = {
  course: Course;
  lesson: Lesson;
};
type ValidationResult = true | string | { success: boolean; message?: string };

export default function ClientLessonContent({ course, lesson }: Props) {
  const { setLessonProgress, getLessonProgress } = useProgressStore();
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const pathname = usePathname();

  const [validateFn, setValidateFn] = useState<
    ((args: { code: string }) => ValidationResult) | null
  >(null);

  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  useEffect(() => {
    if (!lesson) return;
    const savedProgress = getLessonProgress(course.slug, lesson.slug);
    if (savedProgress) {
      setAnswers(savedProgress.answersHistory);
    } else if (lesson.quizzes && lesson.quizzes.length > 0) {
      setAnswers(new Array(lesson.quizzes.length).fill(undefined));
    }
  }, [lesson, getLessonProgress, course.slug]);

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

    // Déclenche confetti si pas d'erreur
    if (errorCount === 0) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }

    // Mets à jour le store de progression
    setLessonProgress(course.slug, lesson.slug, {
      score: calculatedScore,
      totalQuestions: lesson.quizzes.length,
      errorCount,
      completed: true,
      answersHistory: answers,
    });

    // Mets à jour l'état local
    setScore(calculatedScore);
    setShowScore(true);
  };

  useEffect(() => {
    const loadValidateFn = async () => {
      try {
        const segments = pathname.split("/").filter(Boolean);
        const courseSlug = segments[1];
        const lessonSlug = segments[3];

        const mod = await import(
          `@/data/exercises/${courseSlug}/${lessonSlug}.js`
        );
        setValidateFn(() => mod.default?.validate ?? null);
      } catch (e) {
        console.warn("❌ validate() non trouvée:", e);
        setValidateFn(null);
      }
    };

    if (pathname) loadValidateFn();
  }, [pathname]);

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

  // Conditions pour afficher bouton suivant ou résumé
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
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark py-20 px-6">
      {/* En-tête */}
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 dark:text-white">
          {lesson.title}
        </h1>
        <p className="text-xl text-foreground/80 dark:text-white/80 mb-4">
          {lesson.description}
        </p>
        <div className="flex gap-4 text-sm text-foreground/70 dark:text-white/70 mb-6">
          <span>Durée : {lesson.duration}</span>
          <span>Cours : {course.title}</span>
        </div>
        <Button
          as={NextLink}
          href={`/courses/${course.slug}`}
          className="border border-foreground/20 bg-transparent text-foreground font-medium hover:bg-foreground/10 dark:hover:bg-white/10 rounded-lg px-4 py-2 transition-all duration-300 backdrop-blur-sm"
        >
          ← Retour au cours
        </Button>
      </section>

      {/* Contenu Markdown */}
      <section className="max-w-4xl mx-auto mb-12">
        <Card className="bg-content1 dark:bg-content1-dark border border-border rounded-xl">
          <CardBody className="p-6 prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {unescapeBackticks(dedent(lesson.content))}
            </ReactMarkdown>
          </CardBody>
        </Card>
      </section>

      {/* Exercice */}
      {lesson.exercise && (
        <section className="max-w-4xl mx-auto mb-12">
          <ExerciseInteractive
            starterCode={lesson.exercise.starterCode ?? ""}
            solutionCode={lesson.exercise.solutionCode ?? ""}
            description={lesson.exercise.description}
            validate={validateFn ?? undefined}
            onValidateSuccess={() => setExerciseCompleted(true)}
          />
        </section>
      )}

      {/* Quiz */}
      {lesson.quizzes && lesson.quizzes.length > 0 && (
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Quiz</h2>
          <Card className="bg-content1 dark:bg-content1-dark border border-border rounded-xl">
            <CardBody className="p-6">
              {lesson.quizzes.map((q, index) => {
                const userAnswer = answers[index];
                const isAnswered = userAnswer !== undefined;
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div key={`quiz-${index}`} className="mb-6">
                    <p className="text-lg font-semibold dark:text-white flex items-center gap-2">
                      {index + 1}. {q.question}
                      {isAnswered && (
                        <span
                          className={`ml-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}
                          aria-label={isCorrect ? "Correct" : "Incorrect"}
                          title={isCorrect ? "Correct" : "Incorrect"}
                        >
                          {isCorrect ? "✔️" : "❌"}
                        </span>
                      )}
                    </p>
                    <ul className="space-y-2 mt-2">
                      {q.options.map((option, optIndex) => (
                        <li key={`option-${index}-${optIndex}`}>
                          <label
                            className={`flex items-center gap-2 cursor-pointer ${
                              isAnswered
                                ? optIndex === q.correctAnswer
                                  ? "text-green-600 font-semibold"
                                  : optIndex === userAnswer
                                    ? "text-red-600 line-through"
                                    : ""
                                : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`quiz-${index}`}
                              className="text-red-600 focus:ring-red-600"
                              onChange={() => handleAnswer(index, optIndex)}
                              checked={answers[index] === optIndex}
                              disabled={isAnswered}
                            />
                            <span>{option}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </section>
      )}

      {/* Affichage nombre erreurs et barre progression */}
      {showScore && (
        <div className="mt-6  max-w-4xl mx-auto">
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all"
              style={{
                width: `${
                  lesson.quizzes
                    ? (answers.filter((a) => a !== undefined).length /
                        lesson.quizzes.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Bouton Valider */}
      <div className="max-w-4xl mx-auto flex justify-center">
        <Button
          disabled={answers.some((a) => a === undefined)}
          className={`mt-4 font-bold tracking-wide px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ${
            answers.some((a) => a === undefined)
              ? "bg-gray-400 cursor-not-allowed text-gray-800"
              : "bg-black text-white hover:bg-zinc-900 active:scale-95"
          }`}
          onClick={handleValidateQuiz}
        >
          ✅ Valider le quiz
        </Button>
      </div>

      {showScore && lesson.quizzes && (
        <div
          className="mt-4 p-4 max-w-4xl mx-auto bg-green-600 text-white rounded-lg font-semibold text-center"
          role="alert"
          aria-live="polite"
        >
          🎉 Votre score est {score} / {lesson.quizzes.length} !
        </div>
      )}

      {/* Bouton Leçon suivante ou Résumé */}
      <section className="max-w-4xl mx-auto mt-12 flex justify-end gap-4">
        {canProceed && nextLesson ? (
          <Button
            as={NextLink}
            href={`/courses/${course.slug}/lessons/${nextLesson.slug}`}
            className="bg-black text-white font-semibold shadow-md hover:bg-gray-950 transition duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100"
          >
            Leçon suivante : {nextLesson.title}
          </Button>
        ) : canProceed && !nextLesson ? (
          <Button
            as={NextLink}
            href={`/courses/${course.slug}/summary`}
            className="bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100"
          >
            Voir le résumé / résultats
          </Button>
        ) : null}
      </section>
    </div>
  );
}
