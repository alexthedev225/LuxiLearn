// app/admin/lessons/[id]/page.tsx
import LessonDetailClient from "./LessonDetailClient";

export default async function LessonDetailServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // <- On attend la promesse

  // Fetch asynchrone côté serveur
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/lessons/${id}`
  );
  if (!res.ok) throw new Error("Erreur lors du chargement de la leçon");
  const data = await res.json();

  return <LessonDetailClient lesson={data.lesson} />;
}
