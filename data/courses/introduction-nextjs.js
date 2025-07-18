import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ici on utilise process.cwd() car les fichiers markdown sont dans /data/md/lessons/... à la racine projet
const readMarkdown = (slug) => {
  const filePath = path.join(
    process.cwd(),
    "data",
    "md",
    "lessons",
    "introduction-nextjs",
    `${slug}.md`
  );
  return fs.readFileSync(filePath, "utf-8");
};

const loadExercises = async () => {
  const exercisesDir = path.join(
    __dirname,
    "..",
    "exercises",
    "introduction-nextjs"
  );

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
    "introduction-nextjs"
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

async function buildIntroductionNextjs() {
  const exercises = await loadExercises();
  const quizzes = await loadQuizzes();

  return {
    title: "Introduction à Next.js",
    description:
      "Apprends les bases de Next.js pour créer des applications web modernes avec le rendu côté serveur et statique.",
    level: "Débutant",
    technologies: ["Next.js", "React", "JavaScript"],
    slug: "introduction-nextjs",
    duration: "4 heures",
    image: "/nextjs.png",
    lessons: [
      {
        title: "Découverte de Next.js",
        slug: "decouverte-nextjs",
        description:
          "Introduction aux concepts de base et configuration d'un projet Next.js moderne avec App Router.",
        duration: "60 minutes",
        content: readMarkdown("decouverte-nextjs"),
        exercise: exercises["decouverte-nextjs"],
        quiz: quizzes["decouverte-nextjs"],
      },
      {
        title: "Rendu côté serveur (SSR) avec App Router",
        slug: "ssr-nextjs",
        description:
          "Comprendre le SSR et ses avantages dans Next.js App Router.",
        duration: "45 minutes",
        content: readMarkdown("ssr-nextjs"),
        exercise: exercises["ssr-nextjs"],
        quiz: quizzes["ssr-nextjs"],
      },
      {
        title: "Routage avec App Router",
        slug: "app-router-routing",
        description:
          "Créer des pages et gérer le routage dynamique avec Next.js App Router.",
        duration: "40 minutes",
        content: readMarkdown("app-router-routing"),
        exercise: exercises["app-router-routing"],
        quiz: quizzes["app-router-routing"],
      },
      {
        title: "API Routes avec App Router",
        slug: "api-routes",
        description: "Créer des API Routes dans Next.js 14+.",
        duration: "35 minutes",
        content: readMarkdown("api-routes"),
        exercise: exercises["api-routes"],
        quiz: quizzes["api-routes"],
      },
    ],
  };
}

export default buildIntroductionNextjs;
