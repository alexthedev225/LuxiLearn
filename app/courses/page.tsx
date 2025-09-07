// app/courses/page.tsx
import CoursesClient from "./CoursesClient";

 async function getCourses() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_BASE_URL non défini, fallback utilisé");
      return []; // fallback vide
    }

    const res = await fetch(`${baseUrl}/api/courses`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn("Erreur API, fallback utilisé");
      return []; // fallback vide
    }

    return await res.json();
  } catch (err) {
    console.warn("Impossible de fetcher les cours :", err);
    return []; // fallback vide
  }
}


export default async function CoursesPage() {
  const courses = await getCourses();

  return <CoursesClient courses={courses} />;
}
