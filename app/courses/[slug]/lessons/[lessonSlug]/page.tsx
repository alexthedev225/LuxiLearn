// LessonPage.tsx (serveur)
import { Course, Lesson } from "./types";
import ClientLessonContent from "./ClientLessonContent";

// Fonction de récupération des données de la leçon (serveur) avec fallback
async function fetchLesson(
  params: Promise<{ slug: string; lessonSlug: string }>
): Promise<{ course: Course; lesson: Lesson } | null> {
  try {
    const { slug, lessonSlug } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_BASE_URL non défini, fallback utilisé");
      return null; // fallback null
    }

    const res = await fetch(
      `${baseUrl}/api/courses/${slug}/lessons/${lessonSlug}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.warn("Erreur API lors du fetch de la leçon, fallback utilisé");
      return null; // fallback null
    }

    return await res.json();
  } catch (err) {
    console.warn("Impossible de fetcher la leçon :", err);
    return null; // fallback null
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const lessonData = await fetchLesson(params);

  // ⚠️ Vérification du fallback
  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        Impossible de charger la leçon pour le moment.
      </div>
    );
  }

  // TypeScript sait maintenant que lessonData n'est pas null
  const { course, lesson } = lessonData;

  return (
    <div className="min-h-screen">
      <ClientLessonContent course={course} lesson={lesson} />
    </div>
  );
}

