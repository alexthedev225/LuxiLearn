import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ici on utilise process.cwd() car les fichiers markdown sont dans /data/md/lessons/... à la racine projet
const readMarkdown = (slug) => {
  const filePath = path.join(
    process.cwd(),
    "data",
    "md",
    "lessons",
    "server-components-nextjs",
    `${slug}.md`
  );
  return fs.readFileSync(filePath, "utf-8");
};
const loadExercises = async () => {
  const exercisesDir = path.join(
    __dirname,
    "..",
    "exercises",
    "server-components-nextjs"
  );

  if (!fs.existsSync(exercisesDir)) return {}; // Protection si dossier absent

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
    "server-components-nextjs"
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

async function buildSsrNextjs() {
  const quizzes = await loadQuizzes();
  const exercises = await loadExercises();

  return {
    title: "Les Server Components dans Next.js",
    description:
      "Explorer le fonctionnement par défaut du rendu côté serveur avec les Server Components dans Next.js, leurs avantages pour les performances et le SEO, et comment les utiliser dans l’App Router.",
    level: "Débutant",
    technologies: ["Next.js", "React", "JavaScript"],
    slug: "server-components-nextjs",
    duration: "5 heures",
    image: "/server-components.png",
    lessons: [
      {
        title: "Introduction aux Server Components",
        slug: "intro-server-components",
        description:
          "Découvre les Server Components, leur rôle dans l’App Router, et pourquoi ils sont parfaits pour les débutants.",
        duration: "60 minutes",
        content: readMarkdown("intro-server-components"),
        quiz: quizzes["intro-server-components"],
        exercise: exercises["intro-server-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasExport = /export\s+default\s+function\s+home\s*\(/.test(
            normalized
          );
          const hasJSX = /return\s*\([^)]*<\w+[^>]*>.*<\/\w+>/.test(normalized);
          return hasExport && hasJSX;
        },
      },
      {
        title: "Récupérer des données dans les Server Components",
        slug: "fetch-data-server-components",
        description:
          "Apprends à récupérer des données côté serveur dans les Server Components pour afficher du contenu dynamique.",
        duration: "45 minutes",
        content: readMarkdown("fetch-data-server-components"),
        quiz: quizzes["fetch-data-server-components"],
        exercise: exercises["fetch-data-server-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasH1 = /<h1[^>]*>.*liste des articles.*<\/h1>/.test(
            normalized
          );
          const hasUl = /<ul>[\s\S]*<\/ul>/.test(normalized);
          const hasLi = /<li>.*par.*<\/li>/.test(normalized);
          const liMatches = normalized.match(/<li>.*?<\/li>/g) || [];
          const hasAtLeastTwoLi = liMatches.length >= 2;
          return hasH1 && hasUl && hasLi && hasAtLeastTwoLi;
        },
      },
      {
        title: "Combiner Server et Client Components",
        slug: "server-client-components",
        description:
          "Apprends à utiliser Server Components et Client Components ensemble dans une même page.",
        duration: "45 minutes",
        content: readMarkdown("server-client-components"),
        quiz: quizzes["server-client-components"],
        exercise: exercises["server-client-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasH1 = /<h1[^>]*>.*accueil.*<\/h1>/.test(normalized);
          const hasP = /<p[^>]*>.*bonjour depuis le serveur.*<\/p>/.test(
            normalized
          );
          const hasClientImport = /import\s+clientbutton\s+from/.test(
            code.toLowerCase()
          );
          const hasUseClient = /"use client"/.test(code);
          const hasButton = /<button[^>]*>.*incrementer.*<\/button>/.test(
            normalized
          );
          return hasH1 && hasP && hasClientImport && hasUseClient && hasButton;
        },
      },
      {
        title: "Bonnes pratiques pour les Server Components",
        slug: "server-components-best-practices",
        description:
          "Découvre les bonnes pratiques pour optimiser l’utilisation des Server Components dans Next.js.",
        duration: "30 minutes",
        content: readMarkdown("server-components-best-practices"),
        quiz: quizzes["server-components-best-practices"],
        exercise: exercises["server-components-best-practices"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasTry = /try\s*{/.test(normalized);
          const hasCatch = /catch\s*\(/.test(normalized);
          const hasH1 = /<h1[^>]*>.*message.*<\/h1>/.test(normalized);
          const hasP = /<p[^>]*>.*bonjour depuis le serveur.*<\/p>/.test(
            normalized
          );
          const hasErrorP = /<p[^>]*>.*impossible de charger.*<\/p>/.test(
            normalized
          );
          return hasTry && hasCatch && hasH1 && hasP && hasErrorP;
        },
      },
      {
        title: "Génération statique (SSG) et ISR avec Server Components",
        slug: "ssg-isr-server-components",
        description:
          "Apprends à utiliser la génération statique (SSG) et l'Incremental Static Regeneration (ISR) pour optimiser les performances des Server Components.",
        duration: "45 minutes",
        content: readMarkdown("ssg-isr-server-components"),
        quiz: quizzes["ssg-isr-server-components"],
        exercise: exercises["ssg-isr-server-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasFetch = /await\s+fetch\s*\(/.test(normalized);
          const hasCache = /cache:\s*['"]force-cache['"]/.test(normalized);
          const hasRevalidate = /next:\s*{.*revalidate:/.test(normalized);
          const hasH1 = /<h1[^>]*>.*<\/h1>/.test(normalized);
          return hasFetch && (hasCache || hasRevalidate) && hasH1;
        },
      },
      {
        title: "Gestion des métadonnées pour le SEO dans les Server Components",
        slug: "metadata-seo-server-components",
        description:
          "Apprends à configurer les métadonnées statiques et dynamiques pour optimiser le SEO dans les Server Components.",
        duration: "30 minutes",
        content: readMarkdown("metadata-seo-server-components"),
        quiz: quizzes["metadata-seo-server-components"],
        exercise: exercises["metadata-seo-server-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasMetadata =
            /export\s+(const\s+metadata|async\s+function\s+generatemetadata)/i.test(
              code
            );
          const hasTitle = /title\s*:\s*['"].*['"]/.test(normalized);
          const hasDescription = /description\s*:\s*['"].*['"]/.test(
            normalized
          );
          const hasH1 = /<h1[^>]*>.*<\/h1>/.test(normalized);
          return hasMetadata && hasTitle && hasDescription && hasH1;
        },
      },
      {
        title: "Streaming et Suspense avec Server Components",
        slug: "streaming-suspense-server-components",
        description:
          "Découvre comment utiliser le streaming et Suspense pour optimiser le rendu progressif dans les Server Components.",
        duration: "45 minutes",
        content: readMarkdown("streaming-suspense-server-components"),
        quiz: quizzes["streaming-suspense-server-components"],
        exercise: exercises["streaming-suspense-server-components"],
        validate: (code) => {
          const normalized = code.toLowerCase();
          const hasSuspense = /<suspense[^>]*>.*<\/suspense>/.test(normalized);
          const hasFetch = /await\s+fetch\s*\(/.test(normalized);
          const hasH1 = /<h1[^>]*>.*<\/h1>/.test(normalized);
          const hasFallback = /fallback\s*=\s*{/.test(normalized);
          return hasSuspense && hasFetch && hasH1 && hasFallback;
        },
      },
    ],
  };
}
export default buildSsrNextjs;
