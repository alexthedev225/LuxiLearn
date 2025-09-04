  "use client";
  import { useEffect, useState } from "react";
  import Link from "next/link";
  import {
    Plus,
    BookOpen,
    Clock,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
  } from "lucide-react";

  interface AdminCoursesPageClientProps {
    courses: (Course & {
      lessons: {
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        duration: string;
      }[];
    })[];
  }

  interface Course {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    level: string | null;
    technologies: string[];
    createdAt: Date;
  }

  const CourseCard = ({
    course,
    index,
  }: {
    course: Course & {
      lessons: {
        id: number;
        title: string;
        slug: string;
        createdAt: Date;
        duration: string;
      }[];
    };
    index: number;
  }) => {
    const [showActions, setShowActions] = useState(false);

    const getLevelConfig = (level: string | null) => {
      switch (level?.toLowerCase()) {
        case "débutant":
        case "beginner":
          return { label: "DEBUTANT" };
        case "intermédiaire":
        case "intermediate":
          return { label: "INTERMEDIAIRE" };
        case "avancé":
        case "advanced":
          return { label: "AVANCE" };
        default:
          return { label: "NIVEAU" };
      }
    };

    const levelConfig = getLevelConfig(course.level);

    return (
      <div className="group">
        <Link href={`/admin/courses/${course.slug}`} className="block">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 h-[450px] overflow-hidden">
            {/* Red accent line */}
            <div className="h-1 bg-red-600 mb-6 w-16" />

            {/* Header with actions */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {/* Level badge */}
                {course.level && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 border-2 border-black dark:border-white px-4 py-2 bg-white dark:bg-black">
                      <span className="font-bold text-sm tracking-wide text-black dark:text-white">
                        {levelConfig.label}
                      </span>
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-black text-2xl tracking-wide mb-4 text-black dark:text-white uppercase leading-tight">
                  {course.title}
                </h2>
              </div>

              {/* Actions menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowActions(!showActions);
                  }}
                  className="p-2 border-2 border-black dark:border-white bg-white dark:bg-black transition-transform duration-200 hover:translate-x-1 hover:translate-y-1"
                >
                  <MoreVertical className="w-4 h-4 text-black dark:text-white" />
                </button>

                {showActions && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black border-2 border-black dark:border-white z-10">
                    <Link href={`/courses/${course.slug}`}>
                      <div className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 border-b-2 border-black dark:border-white">
                        <Eye className="w-4 h-4" />
                        VOIR LE COURS
                      </div>
                    </Link>
                    <Link href={`/admin/courses/${course.slug}/edit`}>
                      <div className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 border-b-2 border-black dark:border-white">
                        <Edit className="w-4 h-4" />
                        MODIFIER
                      </div>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-6 py-4 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                      SUPPRIMER
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="font-bold text-black dark:text-white mb-6 leading-relaxed line-clamp-2">
              {course.description || "AUCUNE DESCRIPTION DISPONIBLE"}
            </p>

            {/* Technologies */}
            {course.technologies && course.technologies.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {course.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="border-2 border-black dark:border-white px-3 py-1 bg-white dark:bg-black font-bold text-xs text-black dark:text-white tracking-wide uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                  {course.technologies.length > 4 && (
                    <span className="border-2 border-black dark:border-white px-3 py-1 bg-white dark:bg-black font-bold text-xs text-black dark:text-white tracking-wide uppercase">
                      +{course.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between border-t-2 border-black dark:border-white pt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-black dark:text-white" />
                  <span className="font-bold text-sm text-black dark:text-white tracking-wide">
                    {course.lessons.length} LECON
                    {course.lessons.length > 1 ? "S" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black dark:text-white" />
                  <span className="font-bold text-sm text-black dark:text-white tracking-wide">
                    {new Date(course.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="w-20 h-2 border-2 border-black dark:border-white bg-white dark:bg-black">
                <div className="h-full bg-red-600 w-3/4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  export default function AdminCoursesPageClient({
    courses,
  }: AdminCoursesPageClientProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
      <div className="min-h-screen bg-white dark:bg-black ">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            {/* Navigation */}
            <nav className="mb-8">
              <div className="flex items-center gap-4 font-bold text-black dark:text-white tracking-wide">
                <Link
                  href="/admin"
                  className="hover:text-red-600 cursor-pointer transition-colors duration-200 border-2 border-black dark:border-white px-3 py-1"
                >
                  ADMINISTRATION
                </Link>
                <span className="text-2xl">→</span>
                <span className="text-red-600">COURS</span>
              </div>
            </nav>

            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              <div>
                <h1 className="font-black text-6xl tracking-wide text-black dark:text-white mb-4 uppercase leading-none">
                  GESTION
                  <br />
                  <span className="text-red-600">DES COURS</span>
                </h1>
                <div className="h-1 bg-red-600 w-32 mb-6" />
                <p className="font-bold text-xl text-black dark:text-white tracking-wide">
                  {courses.length} COURS DISPONIBLE
                  {courses.length > 1 ? "S" : ""}
                </p>
              </div>

              <Link href="/admin/courses/new">
                <button className="bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102">
                  <div className="flex items-center gap-4">
                    <Plus className="w-5 h-5" />
                    CREER UN COURS
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Courses grid */}
          {courses.length === 0 ? (
            <div className="border-2 border-black dark:border-white p-16 text-center bg-white dark:bg-black">
              <div className="text-8xl mb-8">📚</div>
              <h3 className="font-black text-3xl tracking-wide text-black dark:text-white mb-4 uppercase">
                AUCUN COURS
              </h3>
              <p className="font-bold text-lg text-black dark:text-white mb-8 max-w-md mx-auto">
                CREEZ VOTRE PREMIER COURS POUR COMMENCER A PARTAGER VOS
                CONNAISSANCES
              </p>
              <Link href="/admin/courses/new">
                <button className="bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2">
                  <div className="flex items-center gap-4">
                    <Plus className="w-5 h-5" />
                    CREER MON PREMIER COURS
                  </div>
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          )}

          {/* Bottom stats bar */}
          <div className="mt-16 border-2 border-black dark:border-white p-8 bg-white dark:bg-black">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-2xl tracking-wide text-black dark:text-white mb-2 uppercase">
                  STATISTIQUES
                </h3>
                <div className="h-1 bg-red-600 w-24" />
              </div>

              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="font-black text-4xl text-black dark:text-white">
                    {courses.length}
                  </div>
                  <div className="font-bold text-sm tracking-wide text-black dark:text-white">
                    COURS
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-black text-4xl text-black dark:text-white">
                    {courses.reduce(
                      (acc, course) => acc + course.lessons.length,
                      0
                    )}
                  </div>
                  <div className="font-bold text-sm tracking-wide text-black dark:text-white">
                    LECONS
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-black text-4xl text-red-600">100%</div>
                  <div className="font-bold text-sm tracking-wide text-black dark:text-white">
                    ACTIF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
