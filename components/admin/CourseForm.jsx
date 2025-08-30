"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  BookOpen,
  Clock,
  Tag,
  Plus,
  Trash,
  ArrowLeft,
  ArrowRight,
  Check,
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
        height="300px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleChange}
        ref={editorRef}
      />
    </div>
  );
}

// Step 1: Course Info
function StepCourseInfo({ course, onChange, onNext }) {
  const [technologiesInput, setTechnologiesInput] = useState(
    course.technologies.join(", ")
  );

  const handleChange = (field, value) => {
    onChange({ ...course, [field]: value });
  };

  const handleTechnologiesInputChange = (value) => {
    setTechnologiesInput(value);
    const techs = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onChange({ ...course, technologies: techs });
  };

  const levels = [
    { key: "débutant", label: "DÉBUTANT" },
    { key: "intermédiaire", label: "INTERMÉDIAIRE" },
    { key: "avancé", label: "AVANCÉ" },
  ];



  return (
    <div
      className="max-w-6xl mx-auto  bg-white dark:bg-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide mb-6">
          <BookOpen className="w-4 h-4" />
          ÉTAPE 1/3
        </div>
        <h1 className="font-black text-5xl tracking-wide text-black dark:text-white uppercase mb-4">
          CRÉER UN <span className="text-red-600">NOUVEAU COURS</span>
        </h1>
        <div className="h-1 bg-red-600 w-32 mb-6" />
        <p className="font-bold text-2xl text-black dark:text-white tracking-wide">
          DÉFINISSEZ LES INFORMATIONS GÉNÉRALES
        </p>
      </div>

      <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 mb-12">
        <div className="space-y-8">
          <div>
            <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
              TITRE DU COURS
            </label>
            <div className="relative">
              <BookOpen className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-black dark:text-white" />
              <input
                type="text"
                value={course.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                placeholder="EX: INTRODUCTION À REACT.JS"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
              DESCRIPTION
            </label>
            <textarea
              value={course.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
              rows={4}
              placeholder="DÉCRIVEZ LE CONTENU ET LES OBJECTIFS..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                NIVEAU DE DIFFICULTÉ
              </label>
              <select
                value={course.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                required
              >
                <option value="" disabled>
                  SÉLECTIONNEZ UN NIVEAU
                </option>
                {levels.map((level) => (
                  <option key={level.key} value={level.key}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                DURÉE ESTIMÉE
              </label>
              <div className="relative">
                <Clock className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-black dark:text-white" />
                <input
                  type="text"
                  value={course.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                  placeholder="EX: 4H 30MIN"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
              TECHNOLOGIES UTILISÉES
            </label>
            <div className="relative">
              <Tag className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-black dark:text-white" />
              <input
                type="text"
                value={technologiesInput}
                onChange={(e) => handleTechnologiesInputChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                placeholder="REACT, JAVASCRIPT, CSS"
              />
            </div>
            {course.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {course.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-sm text-black dark:text-white tracking-wide uppercase"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
              SLUG (URL)
            </label>
            <input
              type="text"
              value={course.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
              placeholder="INTRODUCTION-REACT-JS"
              required
            />
            <p className="font-bold text-sm text-black dark:text-white tracking-wide mt-2">
              URL UNIQUE DU COURS
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!course.title || !course.slug}
          className="group bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            ÉTAPE SUIVANTE
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
}

// Step 2: Lessons
function StepLessons({ lessons, onLessonsChange, onPrev, onNext }) {
  const updateLesson = (index, newData) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], ...newData };
    onLessonsChange(newLessons);
  };

  const addLesson = () => {
    onLessonsChange([
      ...lessons,
      {
        title: "",
        description: "",
        duration: "",
        slug: "",
        content: "",
        exercise: {
          title: "",
          prompt: "",
          solution: "",
          validateCode: "",
        },
        quizzes: [],
      },
    ]);
  };

  const removeLesson = (index) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    onLessonsChange(newLessons);
  };

  const addQuiz = (lessonIndex) => {
    const newLessons = [...lessons];
    const lesson = newLessons[lessonIndex];
    lesson.quizzes = lesson.quizzes || [];
    lesson.quizzes.push({
      question: "",
      options: ["", ""],
      correctAnswer: null,
    });
    onLessonsChange(newLessons);
  };

  const updateQuiz = (lessonIndex, quizIndex, newData) => {
    const newLessons = [...lessons];
    const quiz = newLessons[lessonIndex].quizzes[quizIndex];
    newLessons[lessonIndex].quizzes[quizIndex] = { ...quiz, ...newData };
    onLessonsChange(newLessons);
  };

  const addQuizOption = (lessonIndex, quizIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quizzes[quizIndex].options.push("");
    onLessonsChange(newLessons);
  };

  const updateQuizOption = (lessonIndex, quizIndex, optionIndex, value) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quizzes[quizIndex].options[optionIndex] = value;
    onLessonsChange(newLessons);
  };

  const removeQuizOption = (lessonIndex, quizIndex, optionIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quizzes[quizIndex].options.splice(optionIndex, 1);
    onLessonsChange(newLessons);
  };

  const removeQuiz = (lessonIndex, quizIndex) => {
    const newLessons = [...lessons];
    newLessons[lessonIndex].quizzes.splice(quizIndex, 1);
    onLessonsChange(newLessons);
  };

  return (
    <div
      className="max-w-6xl mx-auto  bg-white dark:bg-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide mb-6">
          <BookOpen className="w-4 h-4" />
          ÉTAPE 2/3
        </div>
        <h1 className="font-black text-5xl tracking-wide text-black dark:text-white uppercase mb-4">
          GÉRER LES <span className="text-red-600">LEÇONS</span>
        </h1>
        <div className="h-1 bg-red-600 w-32 mb-6" />
        <p className="font-bold text-2xl text-black dark:text-white tracking-wide">
          CRÉEZ DES LEÇONS STRUCTURÉES
        </p>
      </div>

      <div className="space-y-8">
        {lessons.map((lesson, i) => (
          <div
            key={i}
            className="bg-white dark:bg-black border-2 border-black dark:border-white p-6 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
          >
            <div className="h-1 bg-red-600 mb-6 w-16" />
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase">
                LEÇON {i + 1}: {lesson.title || "NOUVELLE LEÇON"}
              </h3>
              <button
                onClick={() => removeLesson(i)}
                className="p-2 bg-red-600 text-white border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                  TITRE DE LA LEÇON
                </label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => updateLesson(i, { title: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                  placeholder="TITRE DE LA LEÇON"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                  DESCRIPTION
                </label>
                <textarea
                  value={lesson.description}
                  onChange={(e) =>
                    updateLesson(i, { description: e.target.value })
                  }
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
                    onChange={(e) =>
                      updateLesson(i, { duration: e.target.value })
                    }
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
                  onChange={(e) => updateLesson(i, { slug: e.target.value })}
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
                  onChange={(value) => updateLesson(i, { content: value })}
                />
              </div>

              <div className="p-6 bg-white dark:bg-black border-2 border-black dark:border-white">
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
                      value={lesson.exercise?.title || ""}
                      onChange={(e) =>
                        updateLesson(i, {
                          exercise: {
                            ...(lesson.exercise || {}),
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                      placeholder="TITRE DE L'EXERCICE"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-black dark:text-white tracking-wide mb-2">
                      CONSIGNE
                    </label>
                    <textarea
                      value={lesson.exercise?.prompt || ""}
                      onChange={(e) =>
                        updateLesson(i, {
                          exercise: {
                            ...(lesson.exercise || {}),
                            prompt: e.target.value,
                          },
                        })
                      }
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
                      value={lesson.exercise?.solution || ""}
                      onChange={(e) =>
                        updateLesson(i, {
                          exercise: {
                            ...(lesson.exercise || {}),
                            solution: e.target.value,
                          },
                        })
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
                      value={lesson.exercise?.validateCode || ""}
                      onChange={(e) =>
                        updateLesson(i, {
                          exercise: {
                            ...(lesson.exercise || {}),
                            validateCode: e.target.value,
                          },
                        })
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase">
                    QUIZ ASSOCIÉS
                  </h3>
                  <button
                    onClick={() => addQuiz(i)}
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
                    className="p-4 bg-white dark:bg-black border-2 border-black dark:border-white mb-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <input
                        type="text"
                        value={quiz.question || ""}
                        onChange={(e) =>
                          updateQuiz(i, qi, { question: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                        placeholder={`QUESTION ${qi + 1}`}
                      />
                      <button
                        onClick={() => removeQuiz(i, qi)}
                        className="p-2 bg-red-600 text-white border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2 mb-3">
                      {(quiz.options || []).map((option, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateQuizOption(i, qi, oi, e.target.value)
                            }
                            className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
                            placeholder={`OPTION ${oi + 1}`}
                          />
                          <button
                            onClick={() => removeQuizOption(i, qi, oi)}
                            disabled={(quiz.options?.length || 0) <= 2}
                            className="p-2 bg-red-600 text-white border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addQuizOption(i, qi)}
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
                          updateQuiz(i, qi, {
                            correctAnswer: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-black dark:text-white focus:outline-none"
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
          </div>
        ))}

        <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 text-center">
          <button
            onClick={addLesson}
            className="bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102"
          >
            <div className="flex items-center gap-4">
              <Plus className="w-5 h-5" />
              AJOUTER UNE NOUVELLE LEÇON
            </div>
          </button>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2"
          >
            <ArrowLeft className="w-5 h-5" />
            ÉTAPE PRÉCÉDENTE
          </button>

          <button
            onClick={onNext}
            disabled={lessons.length === 0}
            className="group inline-flex items-center gap-3 bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ÉTAPE SUIVANTE
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Review
function StepReview({ course, lessons, onPrev, onSubmit, isSubmitting }) {
  return (
    <div
      className="max-w-6xl mx-auto  bg-white dark:bg-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide mb-6">
          <Check className="w-4 h-4" />
          ÉTAPE 3/3
        </div>
        <h1 className="font-black text-5xl tracking-wide text-black dark:text-white uppercase mb-4">
          RÉCAPITULATIF ET <span className="text-red-600">VALIDATION</span>
        </h1>
        <div className="h-1 bg-red-600 w-32 mb-6" />
        <p className="font-bold text-2xl text-black dark:text-white tracking-wide">
          VÉRIFIEZ LES DÉTAILS AVANT CRÉATION
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1">
          <div className="h-1 bg-red-600 mb-6 w-16" />
          <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase mb-6">
            INFORMATIONS DU COURS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-1">
                TITRE
              </p>
              <p className="font-bold text-black dark:text-white">
                {course.title}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-1">
                NIVEAU
              </p>
              <span className="inline-block px-3 py-1 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-sm text-black dark:text-white tracking-wide uppercase">
                {course.level}
              </span>
            </div>
            <div>
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-1">
                DURÉE
              </p>
              <p className="font-bold text-black dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {course.duration}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-1">
                SLUG
              </p>
              <p className="font-bold text-sm bg-white dark:bg-black border-2 border-black dark:border-white px-2 py-1">
                {course.slug}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-1">
              DESCRIPTION
            </p>
            <p className="font-bold text-black dark:text-white">
              {course.description}
            </p>
          </div>
          <div className="mt-6">
            <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-2">
              TECHNOLOGIES
            </p>
            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-sm text-black dark:text-white tracking-wide uppercase"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          {course.imageFile && (
            <div className="mt-6">
              <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-2">
                IMAGE DE COUVERTURE
              </p>
              <img
                src={URL.createObjectURL(course.imageFile)}
                alt="Image du cours"
                className="w-full max-w-sm h-32 object-cover border-2 border-black dark:border-white"
              />
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1">
          <div className="h-1 bg-red-600 mb-6 w-16" />
          <h3 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase mb-6">
            LEÇONS DU COURS
          </h3>
          <p className="font-bold text-sm text-black dark:text-white tracking-wide mb-4">
            {lessons.length} LEÇON{lessons.length > 1 ? "S" : ""} CRÉÉE
            {lessons.length > 1 ? "S" : ""}
          </p>
          <div className="space-y-4">
            {lessons.map((lesson, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-black border-2 border-black dark:border-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-black dark:text-white">
                    LEÇON {i + 1}: {lesson.title}
                  </h4>
                  <span className="px-3 py-1 bg-white dark:bg-black border-2 border-black dark:border-white font-bold text-sm text-black dark:text-white tracking-wide">
                    {lesson.duration}
                  </span>
                </div>
                <p className="font-bold text-black dark:text-white mb-2">
                  {lesson.description}
                </p>
                <p className="font-bold text-sm text-black dark:text-white tracking-wide">
                  SLUG: {lesson.slug}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onPrev}
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            ÉTAPE PRÉCÉDENTE
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="group inline-flex items-center gap-3 bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "CRÉATION EN COURS..." : "CRÉER LE COURS"}
            {!isSubmitting && <Check className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseForm() {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    level: "",
    technologies: [],
    slug: "",
    duration: "",
   
  });
  const [lessons, setLessons] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

 

  const handleSubmit = async () => {
    if (!course.title || !course.slug) {
      alert("VEUILLEZ REMPLIR LES CHAMPS OBLIGATOIRES.");
      return;
    }
    if (lessons.length === 0) {
      alert("VEUILLEZ AJOUTER AU MOINS UNE LEÇON.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const courseData = {
        ...course
      };

      formData.append("course", JSON.stringify(courseData));
      formData.append("lessons", JSON.stringify(lessons));
     

      const res = await fetch("/api/admin/courses", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("ERREUR CRÉATION: " + errorText);
      }

      setCourse({
        title: "",
        description: "",
        level: "",
        technologies: [],
        slug: "",
        duration: "",
      });
      setLessons([]);
      setStep(1);

      alert("COURS CRÉÉ AVEC SUCCÈS !");
      router.push("/admin/courses");
    } catch (e) {
      alert("ERREUR LORS DE LA CRÉATION DU COURS");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white mx-4">
      {step === 1 && (
        <StepCourseInfo
          course={course}
          onChange={setCourse}
          onNext={nextStep}
          
        />
      )}
      {step === 2 && (
        <StepLessons
          lessons={lessons}
          onLessonsChange={setLessons}
          onPrev={prevStep}
          onNext={nextStep}
        />
      )}
      {step === 3 && (
        <StepReview
          course={course}
          lessons={lessons}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
