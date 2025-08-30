"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Calendar,
  FileText,
  BarChart3,
  Eye,
  Edit,
  ChevronRight,
  Activity,
} from "lucide-react";

// Animated Background Dots
const BackgroundDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-1/4 left-1/6 w-2 h-2 bg-white dark:bg-white rounded-full"
    />
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      className="absolute top-3/4 right-1/4 w-1 h-1 bg-white dark:bg-white rounded-full"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-white dark:bg-white rounded-full"
    />
  </div>
);

// Statistics Card Component
const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="relative bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 group cursor-pointer overflow-hidden"
    >
      {/* Top accent line - only red for important stats */}
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          stat.isImportant ? "bg-red-600" : "bg-black dark:bg-white"
        }`}
      />

      {/* Icon */}
      <div className="mb-6">
        <stat.icon
          className={`w-8 h-8 ${
            stat.isImportant ? "text-red-600" : "text-black dark:text-white"
          }`}
        />
      </div>

      {/* Content */}
      <div>
        <motion.h3
          className="text-4xl font-black text-black dark:text-white mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {stat.value}
        </motion.h3>
        <p className="text-lg font-bold text-black dark:text-white mb-1 uppercase tracking-wide">
          {stat.title}
        </p>
        <p className="text-sm text-black dark:text-white opacity-60 font-medium">
          {stat.subtitle}
        </p>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

// Action Button Component
const ActionButton = ({ action, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 + index * 0.1 }}
  >
    <Link href={action.href}>
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative p-8 rounded-none border-2 ${
          action.isPrimary
            ? "bg-red-600 border-red-600 text-white"
            : "bg-white dark:bg-black border-black dark:border-white text-black dark:text-white"
        } cursor-pointer transition-all duration-200 overflow-hidden`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-wide">
              {action.title}
            </h3>
            <p
              className={`text-sm font-medium ${
                action.isPrimary
                  ? "text-white/80"
                  : "text-black/60 dark:text-white/60"
              }`}
            >
              {action.description}
            </p>
          </div>
          <motion.div whileHover={{ x: 4 }} className="ml-4">
            <ChevronRight
              className={`w-6 h-6 ${
                action.isPrimary ? "text-white" : "text-black dark:text-white"
              }`}
            />
          </motion.div>
        </div>

        {/* Subtle hover overlay for non-primary buttons */}
        {!action.isPrimary && (
          <motion.div
            className="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200"
            initial={false}
          />
        )}
      </motion.div>
    </Link>
  </motion.div>
);

// Recent Item Component
const RecentItem = ({ item, type, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: 6, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        className="group flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className={`w-3 h-3 rounded-full flex-shrink-0 ${
              type === "course" ? "bg-red-600" : "bg-black dark:bg-white"
            }`}
          />

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-black dark:text-white truncate text-lg">
              {item.title}
            </h4>
            {item.subtitle && (
              <p className="text-sm text-black/60 dark:text-white/60 font-medium truncate">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <span className="text-xs text-black/50 dark:text-white/50 font-mono">
            {item.date}
          </span>
          <ChevronRight className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors" />
        </div>
      </motion.div>
    </Link>
  </motion.div>
);

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      title: "Créer un cours",
      description: "Nouveau parcours de formation",
      href: "/admin/courses/new",
      isPrimary: true,
    },
    {
      title: "Voir tous les cours",
      description: "Gérer mes parcours",
      href: "/admin/courses",
      isPrimary: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {actions.map((action, index) => (
        <ActionButton key={action.title} action={action} index={index} />
      ))}
    </div>
  );
};

// Main component
export default function AdminDashboardPageClient({
  courses = [],
  totalCourses = 0,
  totalLessons = 0,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Prepare statistics data
  const stats = [
    {
      icon: BookOpen,
      title: "Cours",
      value: totalCourses,
      subtitle:
        totalCourses > 1 ? "Parcours disponibles" : "Parcours disponible",
      isImportant: true, // Primary stat
    },
    {
      icon: FileText,
      title: "Leçons",
      value: totalLessons,
      subtitle: totalLessons > 1 ? "Leçons disponibles" : "Leçon disponible",
      isImportant: false,
    },
    {
      icon: TrendingUp,
      title: "Moyenne",
      value:
        totalCourses > 0
          ? Math.round((totalLessons / totalCourses) * 10) / 10
          : 0,
      subtitle: "Leçons par cours",
      isImportant: false,
    },
    {
      icon: Activity,
      title: "Cette semaine",
      value: courses.filter((course) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(course.createdAt) > oneWeekAgo;
      }).length,
      subtitle: "Nouveaux cours",
      isImportant: false,
    },
  ];

  // Prepare recent data
  const recentCourses = courses
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map((course) => ({
      title: course.title,
      subtitle: `${course.lessons?.length || 0} leçon${(course.lessons?.length || 0) > 1 ? "s" : ""}`,
      date: new Date(course.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
      href: `/admin/courses/${course.slug}`,
    }));

  const allLessons = courses.flatMap((course) =>
    (course.lessons || []).map((lesson) => ({
      title: lesson.title,
      subtitle: course.title,
      date: new Date(lesson.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
      href: `/admin/lessons/${lesson.slug}`,
    }))
  );

  const recentLessons = allLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto min-h-screen bg-white dark:bg-black text-black dark:text-white relative ">
      <BackgroundDots />

      {/* Header */}
      <section className="pt-16 pb-12 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
         
        >
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight mb-4">
            Dashboard
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-8" />
          <p className="text-xl font-medium text-black/70 dark:text-white/70 max-w-2xl">
            Vue d'ensemble de votre plateforme de formation
          </p>
        </motion.div>
      </section>

      {/* Statistics */}
      <section className="pb-16 ">
        <div >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-black uppercase tracking-wide mb-2">
              Statistiques
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-16 ">
        <div >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-black uppercase tracking-wide mb-2">
              Actions
            </h2>
          </motion.div>

          <QuickActions />
        </div>
      </section>

      {/* Recent Content */}
      <section className="pb-20 ">
        <div >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Courses */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-wide">
                  Cours récents
                </h2>
                <Link
                  href="/admin/courses"
                  className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide"
                >
                  Voir tout
                </Link>
              </div>

              <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none">
                {recentCourses.length > 0 ? (
                  recentCourses.map((course, index) => (
                    <RecentItem
                      key={`course-${index}`}
                      item={course}
                      type="course"
                      index={index}
                    />
                  ))
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-black/20 dark:text-white/20" />
                    <p className="font-medium text-black/50 dark:text-white/50">
                      Aucun cours créé
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Lessons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-wide">
                  Leçons récentes
                </h2>
                <Link
                  href="/admin/lessons"
                  className="text-sm font-bold text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 transition-colors uppercase tracking-wide"
                >
                  Voir tout
                </Link>
              </div>

              <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none">
                {recentLessons.length > 0 ? (
                  recentLessons.map((lesson, index) => (
                    <RecentItem
                      key={`lesson-${index}`}
                      item={lesson}
                      type="lesson"
                      index={index}
                    />
                  ))
                ) : (
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-black/20 dark:text-white/20" />
                    <p className="font-medium text-black/50 dark:text-white/50">
                      Aucune leçon créée
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
