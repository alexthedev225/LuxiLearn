// app/admin/lessons/[id]/edit/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  BookOpen,
  Clock,
  Plus,
  Trash,
  ArrowLeft,
  Check,
  AlertTriangle,
} from "lucide-react";

// Dynamically import Toast UI Editor
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] bg-white dark:bg-black border-2 border-black dark:border-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-600 mx-auto mb-4"></div>
          <p className="font-bold text-black dark:text-white tracking-wide">
            CHARGEMENT DE L'ÉDITEUR...
          </p>
        </div>
      </div>
    ),
  }
);

// ToastMarkdownEditor component
function ToastMarkdownEditor({ value, onChange }) {
  const editorRef = React.useRef();

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    onChange(markdown);
  };

  useEffect(() => {
    import("@toast-ui/editor/dist/toastui-editor.css");
  }, []);

  return (
    <div className="border-2 border-black dark:border-white">
      <Editor
        initialValue={value}
        previewStyle="vertical"
        height="700px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleChange}
        ref={editorRef}
      />
    </div>
  );
}

export default function LessonEditForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [lesson, setLesson] = useState({
    courseSlug: "",
    title: "",
    description: "",
    duration: "",
    slug: "",
    content: "",
    exercise: { title: "", prompt: "", solution: "", validateCode: "" },
    quizzes: [],
  });
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lesson data
  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await fetch(`/api/admin/lessons/${id}`);
        if (!res.ok) throw new Error("ERREUR LORS DU CHARGEMENT DE LA LEÇON");
        const data = await res.json();
        setLesson({
          courseSlug: data.lesson.course.slug || "",
          title: data.lesson.title || "",
          description: data.lesson.description || "",
          duration: data.lesson.duration || "",
          slug: data.lesson.slug || "",
          content: data.lesson.content || "",
          exercise: data.lesson.exercise || {
            title: "",
            prompt: "",
            solution: "",
            validateCode: "",
          },
          quizzes: data.lesson.quizzes || [],
        });
      } catch (err) {
        setError("IMPOSSIBLE DE CHARGER LA LEÇON");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLesson();
  }, [id]);

  // Fetch available courses for the dropdown
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/admin/courses");
        if (!res.ok) throw new Error("ERREUR LORS DU CHARGEMENT DES COURS");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        setError("IMPOSSIBLE DE CHARGER LES COURS");
        console.error(err);
      }
    }
    fetchCourses();
  }, []);

  // Update lesson fields
  const updateLesson = (newData) => {
    setLesson((prev) => ({ ...prev, ...newData }));
  };

  // Update exercise fields
  const updateExercise = (newData) => {
    setLesson((prev) => ({
      ...prev,
      exercise: { ...(prev.exercise || {}), ...newData },
    }));
  };

  // Add a new quiz
  const addQuiz = () => {
    setLesson((prev) => ({
      ...prev,
      quizzes: [
        ...(prev.quizzes || []),
        { question: "", options: ["", ""], correctAnswer: null },
      ],
    }));
  };

  // Update a quiz
  const updateQuiz = (quizIndex, newData) => {
    setLesson((prev) => {
      const newQuizzes = [...prev.quizzes];
      newQuizzes[quizIndex] = { ...newQuizzes[quizIndex], ...newData };
      return { ...prev, quizzes: newQuizzes };
    });
  };

  // Add a quiz option
  const addQuizOption = (quizIndex) => {
    setLesson((prev) => {
      const newQuizzes = [...prev.quizzes];
      newQuizzes[quizIndex].options.push("");
      return { ...prev, quizzes: newQuizzes };
    });
  };

  // Update a quiz option
  const updateQuizOption = (quizIndex, optionIndex, value) => {
    setLesson((prev) => {
      const newQuizzes = [...prev.quizzes];
      newQuizzes[quizIndex].options[optionIndex] = value;
      return { ...prev, quizzes: newQuizzes };
    });
  };

  // Remove a quiz option
  const removeQuizOption = (quizIndex, optionIndex) => {
    setLesson((prev) => {
      const newQuizzes = [...prev.quizzes];
      newQuizzes[quizIndex].options.splice(optionIndex, 1);
      return { ...prev, quizzes: newQuizzes };
    });
  };

  // Remove a quiz
  const removeQuiz = (quizIndex) => {
    setLesson((prev) => {
      const newQuizzes = prev.quizzes.filter((_, i) => i !== quizIndex);
      return { ...prev, quizzes: newQuizzes };
    });
  };

  // Handle form submission (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson.title || !lesson.slug || !lesson.courseSlug) {
      setError(
        "VEUILLEZ REMPLIR TOUS LES CHAMPS OBLIGATOIRES (TITRE, SLUG, COURS)."
      );
      return;
    }

    const invalidQuizzes = lesson.quizzes.some(
      (quiz) =>
        quiz.options.length < 2 ||
        quiz.correctAnswer === null ||
        quiz.correctAnswer >= quiz.options.length
    );
    if (invalidQuizzes) {
      setError(
        "CHAQUE QUIZ DOIT AVOIR AU MOINS 2 OPTIONS ET UNE RÉPONSE CORRECTE VALIDE."
      );
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lesson,
          exercise: lesson.exercise.title ? lesson.exercise : undefined,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          errorText || "ERREUR LORS DE LA MISE À JOUR DE LA LEÇON"
        );
      }

      alert("LEÇON MISE À JOUR AVEC SUCCÈS !");
      router.push(`/admin/lessons/${id}`);
    } catch (err) {
      setError(err.message || "ERREUR LORS DE LA MISE À JOUR DE LA LEÇON");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle lesson deletion (DELETE)
  const handleDelete = async () => {
    if (
      !confirm(
        "ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER CETTE LEÇON ? CETTE ACTION EST IRRÉVERSIBLE."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          errorText || "ERREUR LORS DE LA SUPPRESSION DE LA LEÇON"
        );
      }

      alert("LEÇON SUPPRIMÉE AVEC SUCCÈS !");
      router.push(`/courses/${lesson.courseSlug}`);
    } catch (err) {
      setError(err.message || "ERREUR LORS DE LA SUPPRESSION DE LA LEÇON");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-600 mx-auto mb-4"></div>
          <p className="font-bold text-black dark:text-white tracking-wide">
            CHARGEMENT DE LA LEÇON...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide mb-6">
            <BookOpen className="w-4 h-4" />
            MODIFIER UNE LEÇON
          </div>
          <h1 className="font-black text-5xl tracking-wide text-black dark:text-white uppercase mb-4">
            MODIFIER <span className="text-red-600">{lesson.title}</span>
          </h1>
          <div className="h-1 bg-red-600 w-32 mb-6" />
          <p className="font-bold text-2xl text-black dark:text-white tracking-wide">
            METTEZ À JOUR LES DÉTAILS DE LA LEÇON
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-white dark:bg-black border-2 border-red-600 text-red-600 font-bold text-sm tracking-wide">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
        >
          <div className="space-y-8">
            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                COURS
              </label>
              <select
                value={lesson.courseSlug}
                onChange={(e) => updateLesson({ courseSlug: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                required
              >
                <option value="" disabled>
                  SÉLECTIONNEZ UN COURS
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.slug}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                TITRE DE LA LEÇON
              </label>
              <div className="relative">
                <BookOpen className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-black dark:text-white" />
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson({ title: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                  placeholder="TITRE DE LA LEÇON"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                DESCRIPTION
              </label>
              <textarea
                value={lesson.description}
                onChange={(e) => updateLesson({ description: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                rows={2}
                placeholder="DESCRIPTION COURTE"
              />
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                DURÉE ESTIMÉE
              </label>
              <div className="relative">
                <Clock className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-black dark:text-white" />
                <input
                  type="text"
                  value={lesson.duration}
                  onChange={(e) => updateLesson({ duration: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                  placeholder="EX: 15MIN"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                SLUG (URL)
              </label>
              <input
                type="text"
                value={lesson.slug}
                onChange={(e) => updateLesson({ slug: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                placeholder="EX: INTRODUCTION"
                required
              />
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mt-2">
                URL UNIQUE DE LA LEÇON
              </p>
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                CONTENU (MARKDOWN)
              </label>
              <ToastMarkdownEditor
                value={lesson.content || ""}
                onChange={(value) => updateLesson({ content: value })}
              />
            </div>

            <div className="p-6 bg-white dark:bg-black border-2 border-black dark:border-white">
              <div className="h-1 bg-red-600 mb-6 w-16" />
              <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase mb-4">
                EXERCICE ASSOCIÉ
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                    TITRE DE L'EXERCICE
                  </label>
                  <input
                    type="text"
                    value={lesson.exercise.title || ""}
                    onChange={(e) => updateExercise({ title: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                    placeholder="TITRE DE L'EXERCICE"
                  />
                </div>
                <div>
                  <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                    CONSIGNE
                  </label>
                  <textarea
                    value={lesson.exercise.prompt || ""}
                    onChange={(e) => updateExercise({ prompt: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                    rows={3}
                    placeholder="DESCRIPTION / CONSIGNE"
                  />
                </div>
                <div>
                  <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                    SOLUTION
                  </label>
                  <textarea
                    value={lesson.exercise.solution || ""}
                    onChange={(e) =>
                      updateExercise({ solution: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                    rows={5}
                    placeholder="CODE SOLUTION"
                  />
                </div>
                <div>
                  <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                    VALIDATION (JS)
                  </label>
                  <textarea
                    value={lesson.exercise.validateCode || ""}
                    onChange={(e) =>
                      updateExercise({ validateCode: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                    rows={5}
                    placeholder="export function validate(code) { ... }"
                  />
                  <p className="font-bold text-sm text-black dark:text-white tracking-wide mt-2">
                    FONCTION JS POUR VALIDER LE CODE
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-black border-2 border-black dark:border-white">
              <div className="h-1 bg-red-600 mb-6 w-16" />
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase">
                  QUIZ ASSOCIÉS
                </h3>
                <button
                  onClick={addQuiz}
                  className="bg-red-600 text-white font-black text-sm tracking-wide px-4 py-2 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    AJOUTER UNE QUESTION
                  </div>
                </button>
              </div>

              {(lesson.quizzes || []).map((quiz, qi) => (
                <div
                  key={qi}
                  className="p-4 bg-white dark:bg-black border-2 border-black dark:border-white mb-4 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      value={quiz.question || ""}
                      onChange={(e) =>
                        updateQuiz(qi, { question: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-red-600 text-white border-2 border-black dark:border-white font-black text-lg tracking-wide focus:outline-none"
                      placeholder={`QUESTION ${qi + 1}`}
                    />
                    <button
                      onClick={() => removeQuiz(qi)}
                      className="absolute top-4 right-4 p-2 bg-red-600 text-white border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="h-1 bg-red-600 mb-4" />

                  <div className="space-y-2 mb-3">
                    {(quiz.options || []).map((option, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateQuizOption(qi, oi, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                          placeholder={`OPTION ${oi + 1}`}
                        />
                        <button
                          onClick={() => removeQuizOption(qi, oi)}
                          disabled={(quiz.options?.length || 0) <= 2}
                          className="p-2 bg-red-600 text-white border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addQuizOption(qi)}
                      className="inline-flex items-center gap-2 bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide px-4 py-2 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                    >
                      <Plus className="w-4 h-4" />
                      AJOUTER UNE OPTION
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                      RÉPONSE CORRECTE
                    </label>
                    <select
                      value={
                        quiz.correctAnswer !== null
                          ? quiz.correctAnswer.toString()
                          : ""
                      }
                      onChange={(e) =>
                        updateQuiz(qi, {
                          correctAnswer: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-red-600 font-bold text-black dark:text-white focus:outline-none"
                      required
                    >
                      <option value="" disabled>
                        SÉLECTIONNEZ LA BONNE RÉPONSE
                      </option>
                      {(quiz.options || []).map((opt, idx) => (
                        <option key={idx} value={idx}>
                          {opt || `Option ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => router.push(`/courses/${lesson.courseSlug}`)}
              disabled={isSubmitting || isDeleting}
              className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              RETOUR
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleDelete}
                disabled={isSubmitting || isDeleting}
                className="inline-flex items-center gap-3 bg-white dark:bg-black text-red-600 font-black text-lg tracking-wide px-8 py-4 border-2 border-red-600 transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertTriangle className="w-5 h-5" />
                {isDeleting ? "SUPPRESSION EN COURS..." : "SUPPRIMER LA LEÇON"}
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isDeleting}
                className="group inline-flex items-center gap-3 bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "MISE À JOUR EN COURS..."
                  : "METTRE À JOUR LA LEÇON"}
                {!isSubmitting && <Check className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
