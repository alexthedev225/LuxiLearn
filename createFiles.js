import fs from "fs";
import path from "path";
// Importer la fonction buildSsrNextjs qui construit le cours complet
import buildIntroductionNextjs from "./data/courses/introduction-nextjs.js";

/**
 * Crée un dossier s'il n'existe pas déjà
 * @param {string} dirPath
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Création du dossier : ${dirPath}`);
  }
}

/**
 * Crée un fichier uniquement s'il n'existe pas déjà
 * @param {string} filePath
 * @param {string} content
 */
function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`📝 Créé fichier : ${filePath}`);
  } else {
    console.log(`⚠️ Fichier existe déjà : ${filePath}`);
  }
}

/**
 * Template markdown minimal pour une leçon
 * @param {string} title
 * @returns {string}
 */
const templateMarkdown = (title) =>
  `# ${title}\n\nÉcris ici le contenu markdown de la leçon.\n`;

/**
 * Template exercice minimal
 */
const templateExercise = `// Exercice vide
export default function exercise() {
  return "Complète cet exercice.";
}
`;

/**
 * Template quiz minimal
 */
const templateQuiz = `// Quiz vide
export default {
  questions: [],
};
`;

async function main() {
  // Récupérer le cours complet (objet avec title, slug, lessons, etc.)
  const course = await buildIntroductionNextjs();

  const courseSlug = course.slug;
  const lessons = course.lessons.map(({ title, slug }) => ({ title, slug }));

  // Construire les chemins dynamiques
  const dataRoot = path.join(
    process.cwd(),
    "data",
    "md",
    "lessons",
    courseSlug
  );
  const exercisesRoot = path.join(
    process.cwd(),
    "data",
    "exercises",
    courseSlug
  );
  const quizzesRoot = path.join(process.cwd(), "data", "quizzes", courseSlug);

  // Créer dossiers si nécessaire
  ensureDir(dataRoot);
  ensureDir(exercisesRoot);
  ensureDir(quizzesRoot);

  // Créer les fichiers pour chaque leçon
  for (const { title, slug } of lessons) {
    const mdPath = path.join(dataRoot, `${slug}.md`);
    const exPath = path.join(exercisesRoot, `${slug}.js`);
    const quizPath = path.join(quizzesRoot, `${slug}.js`);

    writeFileIfNotExists(mdPath, templateMarkdown(title));
    writeFileIfNotExists(exPath, templateExercise);
    writeFileIfNotExists(quizPath, templateQuiz);
  }

  console.log("✅ Tous les fichiers ont été créés ou existent déjà.");
}

main().catch((err) => {
  console.error("❌ Erreur lors de la création des fichiers :", err);
});
