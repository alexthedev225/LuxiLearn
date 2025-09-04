// types.ts

// ==== Quiz ====
export type Quiz = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index de la réponse correcte dans `options`
};

// ==== Exercise ====
export type Exercise = {
  description: string;
  starterCode?: string; // code de départ pour l'exercice
  solutionCode?: string; // solution finale
  validateCode?: string; // chaîne de fonction pour validation dynamique (optionnelle)
  prompt?: string; // texte à afficher dans le composant interactif
  solution?: string; // solution visible après validation ou indice
};

// ==== Lesson ====
export type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string; // ex: "5 min"
  slug: string;
  content: string; // markdown du cours
  exercise?: Exercise | null;
  quizzes?: Quiz[];
};

// ==== Course ====
export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string; // durée totale du cours
  level: string; // "débutant" | "intermédiaire" | "avancé"
  technologies: string[]; // ex: ["Next.js", "TypeScript"]
  slug: string; // pour le routing
  lessons: Lesson[]; // liste complète des leçons
}

// ==== Route Params pour les pages dynamiques ====
export type Params = {
  slug: string;
  lessonSlug: string;
};
