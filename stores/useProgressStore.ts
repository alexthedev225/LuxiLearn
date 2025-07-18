import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LessonProgress {
  score: number; // bonnes réponses
  totalQuestions: number;
  errorCount: number; // mauvaises réponses
  completed: boolean;
  answersHistory: (number | undefined)[];
}

interface CourseProgress {
  [lessonSlug: string]: LessonProgress;
}

interface ProgressState {
  courses: {
    [courseSlug: string]: CourseProgress;
  };
  setLessonProgress: (
    courseSlug: string,
    lessonSlug: string,
    progress: LessonProgress
  ) => void;
  getLessonProgress: (
    courseSlug: string,
    lessonSlug: string
  ) => LessonProgress | undefined;
  resetCourseProgress: (courseSlug: string) => void; // <-- Ajouté ici
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      courses: {},

      setLessonProgress(courseSlug, lessonSlug, progress) {
        set((state) => {
          const courseProgress = state.courses[courseSlug] || {};
          return {
            courses: {
              ...state.courses,
              [courseSlug]: {
                ...courseProgress,
                [lessonSlug]: progress,
              },
            },
          };
        });
      },

      getLessonProgress(courseSlug, lessonSlug) {
        const courseProgress = get().courses[courseSlug];
        if (!courseProgress) return undefined;
        return courseProgress[lessonSlug];
      },

      resetCourseProgress(courseSlug: string) {
        set((state) => {
          // Supprimer la progression du cours en remplaçant courses sans ce cours
          const newCourses = { ...state.courses };
          delete newCourses[courseSlug];
          return { courses: newCourses };
        });
      },
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
