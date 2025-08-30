// app/courses/page.tsx
import CoursesClient from "./CoursesClient";

async function getCourses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/courses`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return <CoursesClient courses={courses} />;
}
