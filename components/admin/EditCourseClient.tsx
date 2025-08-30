// components/admin/EditCourseClient.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import EditCourseForm from "@/components/admin/EditCourseForm";

interface EditCourseClientProps {
  course: {
    slug: string;
    title: string;
    // Ajoutez d'autres propriétés du cours si nécessaire
  };
}

const EditCourseClient: React.FC<EditCourseClientProps> = ({ course }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6">
        {/* Navigation breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/admin"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              Administration
            </Link>
            <span>→</span>
            <Link
              href="/admin/courses"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              Cours
            </Link>
            <span>→</span>
            <Link
              href={`/admin/courses/${course.slug}`}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              {course.title}
            </Link>
            <span>→</span>
            <span
              className="text-neutral-900 dark:text-white font-medium"
              aria-current="page"
            >
              Édition
            </span>
          </div>
        </motion.nav>
      </header>

      {/* Form container */}
      <section className="bg-white dark:bg-zinc-900">
        <EditCourseForm course={course} />
      </section>
    </div>
  );
};

export default EditCourseClient;