export async function getCourses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/courses`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}
