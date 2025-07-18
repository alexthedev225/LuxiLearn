import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import NextLink from "next/link";
interface Lesson {
  id: string | number;
  slug: string;
  title: string;
  // Ajoute d’autres propriétés utiles ici si besoin
}
interface Course {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  level: string;
  duration: string;
  lessons: Lesson[]; // plus précis que any[]
  slug: string;
}
async function getCourses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/courses`,
    {
      cache: "no-store", // ou 'force-cache' si tu veux cacher
    }
  );
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  if (!courses || courses.length === 0) {
    return <p>Aucun cours disponible.</p>;
  }

  return (
    <div className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark py-10 px-6">
      <section className="relative max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Nos <span className="text-red-600">Cours</span>
        </h1>
        <p className="mt-4 text-xl text-foreground/80 dark:text-white max-w-2xl mx-auto">
          Explorez nos cours gratuits et commencez à maîtriser le développement
          web moderne dès aujourd'hui.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: Course) => (
            <Card
              key={course.id}
              className="group relative bg-content1 dark:bg-content1-dark border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={`Image du cours ${course.title}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {course.title}
                </h2>
                <p className="text-foreground/80 dark:text-white/80 text-sm mb-4">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-200 text-red-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-foreground/70 dark:text-white/70">
                  <span>{course.level}</span>
                  <span>
                    {course.duration} • {course.lessons.length} leçons
                  </span>
                </div>
              </CardBody>
              <CardFooter className="p-6 pt-0">
                <Button
                  as={NextLink}
                  href={`/courses/${course.slug}`}
                  className="w-full bg-red-600 text-primary-foreground font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                >
                  Découvrir le cours
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
