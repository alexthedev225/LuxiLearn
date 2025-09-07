import Link from "next/link";
import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react";
import type { Course } from "./courses/[slug]/lessons/[lessonSlug]/types";

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/courses`,
      {
        next: { revalidate: 3600 }, // ISR
      }
    );
    if (res.ok) {
      courses = await res.json();
    } else {
      console.error("Erreur API :", res.status, res.statusText);
    }
  } catch (err) {
    console.error("Erreur fetch courses :", err);
  }

  const limitedCourses = courses.slice(0, 2);

  return (
    <div className="relative w-full px-4 sm:px-6 py-8 sm:py-20">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Texte à gauche */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border-2 border-red-600 text-red-600 uppercase font-bold text-xs rounded mb-3">
            <BookOpen className="w-3 h-3" />
            Catalogue complet
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase text-neutral-900 dark:text-neutral-100 leading-tight mb-2">
            Nos cours
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase text-red-600 leading-tight mb-3">
            D'EXCEPTION
          </h2>

          <p className="text-base sm:text-lg text-neutral-900 dark:text-neutral-300 max-w-md sm:max-w-lg leading-relaxed mb-6">
            Découvre nos cours gratuits pour maîtriser le développement moderne,
            étape par étape.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
            <div>
              <div className="text-2xl text-center sm:text-3xl font-black text-red-600">
                100%
              </div>
              <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                Gratuit
              </div>
            </div>
            <div>
              <div className="text-2xl text-center sm:text-3xl font-black text-red-600">
                ∞
              </div>
              <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                Accès illimité
              </div>
            </div>
          </div>
        </div>

        {/* Cards à droite */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8">
          {limitedCourses.map((course) => (
            <div
              key={course.id}
              className="group relative border border-neutral-300 dark:border-neutral-700 p-4 sm:p-6 flex flex-col h-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <Link
                href={`/courses/${course.slug}`}
                className="flex flex-col flex-1"
                aria-label={`En savoir plus sur le cours ${course.title}`}
              >
                <div className="inline-flex items-center gap-1 px-2 py-0.5 border-2 border-red-600 text-red-600 uppercase font-bold text-[0.65rem] mb-4 w-max rounded">
                  <Star className="w-2.5 h-2.5" />
                  Gratuit
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-300 mb-4 flex-1 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>Débutant</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-red-600 font-black uppercase tracking-wide text-sm sm:text-base group-hover:text-red-700 transition-colors">
                      Commencer maintenant
                    </span>
                    <ArrowRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
