import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readMarkdown = (slug) => {
  const filePath = path.join(
    process.cwd(),
    "data",
    "md",
    "lessons",
    "client-state-nextjs15",
    `${slug}.md`
  );
  return fs.readFileSync(filePath, "utf-8");
};

const loadExercises = async () => {
  const exercisesDir = path.join(
    __dirname,
    "..",
    "exercises",
    "client-state-nextjs15"
  );

  if (!fs.existsSync(exercisesDir)) return {};

  const files = fs.readdirSync(exercisesDir).filter((f) => f.endsWith(".js"));

  const map = {};

  for (const file of files) {
    const slug = file.replace(".js", "");
    const modulePath = path.join(exercisesDir, file);
    const mod = await import(modulePath);
    map[slug] = mod.default;
  }

  return map;
};

const loadQuizzes = async () => {
  const quizzesDir = path.join(
    __dirname,
    "..",
    "quizzes",
    "client-state-nextjs15"
  );

  const files = fs.readdirSync(quizzesDir).filter((f) => f.endsWith(".js"));

  const map = {};

  for (const file of files) {
    const slug = file.replace(".js", "");
    const modulePath = path.join(quizzesDir, file);
    const mod = await import(modulePath);
    map[slug] = mod.default;
  }

  return map;
};

async function buildClientStateNextjs() {
  const quizzes = await loadQuizzes();
  const exercises = await loadExercises();

  return {
    title: "Composants client & gestion du state",
    description:
      "Explorer l'utilisation des composants client avec la directive 'use client' et la gestion du state avec 'useState' et 'useEffect' dans Next.js 15.",
    level: "Débutant",
    technologies: ["Next.js 15", "React", "JavaScript"],
    slug: "client-state-nextjs15",
    duration: "5 heures",
    image: "/client-state.png",
    lessons: [
      {
        title: "Introduction aux composants client",
        slug: "intro-client-components",
        description:
          "Comprendre la directive 'use client' et son rôle dans l'activation des fonctionnalités côté client.",
        duration: "60 minutes",
        content: readMarkdown("intro-client-components"),
        quiz: quizzes["intro-client-components"],
        exercise: exercises["intro-client-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasUseClient = /"use client"/.test(code);
          return hasUseClient;
        },
      },
      {
        title: "Gestion du state avec useState",
        slug: "use-state-client",
        description:
          "Apprendre à gérer le state local dans les composants client avec le hook 'useState'.",
        duration: "45 minutes",
        content: readMarkdown("use-state-client"),
        quiz: quizzes["use-state-client"],
        exercise: exercises["use-state-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasUseState = /useState\s*\(/.test(code);
          return hasUseState;
        },
      },
      {
        title: "Effets de bord avec useEffect",
        slug: "use-effect-client",
        description:
          "Comprendre l'utilisation du hook 'useEffect' pour gérer les effets de bord dans les composants client.",
        duration: "45 minutes",
        content: readMarkdown("use-effect-client"),
        quiz: quizzes["use-effect-client"],
        exercise: exercises["use-effect-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasUseEffect = /useEffect\s*\(/.test(code);
          return hasUseEffect;
        },
      },
      {
        title: "Interaction avec l'utilisateur",
        slug: "user-interaction-client",
        description:
          "Gérer les événements utilisateur tels que les clics et les soumissions de formulaires dans les composants client.",
        duration: "45 minutes",
        content: readMarkdown("user-interaction-client"),
        quiz: quizzes["user-interaction-client"],
        exercise: exercises["user-interaction-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasOnClick = /onClick\s*=\s*\(/.test(code);
          const hasOnSubmit = /onSubmit\s*=\s*\(/.test(code);
          return hasOnClick || hasOnSubmit;
        },
      },
      {
        title: "Bonnes pratiques pour les composants client",
        slug: "best-practices-client",
        description:
          "Explorer les meilleures pratiques pour optimiser les performances et la maintenabilité des composants client.",
        duration: "30 minutes",
        content: readMarkdown("best-practices-client"),
        quiz: quizzes["best-practices-client"],
        exercise: exercises["best-practices-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasMemo = /React\.memo\s*\(/.test(code);
          const hasCallback = /useCallback\s*\(/.test(code);
          return hasMemo || hasCallback;
        },
      },
      {
        title: "Gestion du state global avec Context API",
        slug: "context-api-client",
        description:
          "Apprendre à partager le state entre plusieurs composants avec la Context API de React.",
        duration: "45 minutes",
        content: readMarkdown("context-api-client"),
        quiz: quizzes["context-api-client"],
        exercise: exercises["context-api-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasCreateContext = /createContext\s*\(/.test(code);
          const hasUseContext = /useContext\s*\(/.test(code);
          return hasCreateContext && hasUseContext;
        },
      },
      {
        title: "Optimisation des performances des composants client",
        slug: "performance-client",
        description:
          "Explorer les techniques d'optimisation des performances pour les composants client dans Next.js 15.",
        duration: "30 minutes",
        content: readMarkdown("performance-client"),
        quiz: quizzes["performance-client"],
        exercise: exercises["performance-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasLazy = /React\.lazy\s*\(/.test(code);
          const hasSuspense = /Suspense\s*\(/.test(code);
          return hasLazy && hasSuspense;
        },
      },
      {
        title: "Gestion des erreurs et des états de chargement",
        slug: "error-handling-client",
        description:
          "Apprendre à gérer les erreurs et les états de chargement dans les composants client.",
        duration: "45 minutes",
        content: readMarkdown("error-handling-client"),
        quiz: quizzes["error-handling-client"],
        exercise: exercises["error-handling-client"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasTryCatch = /try\s*{/.test(code) && /catch\s*\(/.test(code);
          const hasErrorState = /setError\s*\(/.test(code);
          return hasTryCatch && hasErrorState;
        },
      },
    ],
  };
}

export default buildClientStateNextjs;
