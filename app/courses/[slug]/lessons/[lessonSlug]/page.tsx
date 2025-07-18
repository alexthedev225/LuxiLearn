// LessonPage.tsx (serveur)
import {  Course, Lesson } from "./types";
import ClientLessonContent from "./ClientLessonContent";

// Fonction de récupération des données de la leçon (serveur)
async function fetchLesson(
  params: Promise<{ slug: string; lessonSlug: string }>
): Promise<{ course: Course; lesson: Lesson }> {
  const { slug, lessonSlug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${slug}/lessons/${lessonSlug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch lesson data");
  }

  return res.json();
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  // Récupérer les données de la leçon et du cours
  const { course, lesson } = await fetchLesson(params);

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark py-20 px-6">
      <ClientLessonContent course={course} lesson={lesson} />
    </div>
  );
}
