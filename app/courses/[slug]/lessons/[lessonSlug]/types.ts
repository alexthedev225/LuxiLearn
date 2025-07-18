// types.ts (à séparer dans un fichier dédié pour plus de clarté)
export type Quiz = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Exercise = {
  description: string;
  starterCode?: string;
  solutionCode?: string;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  slug: string;
  content: string;
  exercise?: Exercise | null;
  quizzes?: Quiz[];
};

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  technologies: string[];
  slug: string;
  duration: string;
  image: string;
  lessons: Lesson[]; // assure-toi que c’est présent !
}


export type Params = {
  slug: string;
  lessonSlug: string;
};
