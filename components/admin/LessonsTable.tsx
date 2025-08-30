"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function LessonsByCourse({ lessons, courses }) {
  const router = useRouter();
  const [localLessons, setLocalLessons] = useState(lessons);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      setLocalLessons(localLessons.filter((lesson) => lesson.id !== id));
      toast.success("Leçon supprimée !", {
        style: {
          background: "#000",
          color: "#fff",
          border: "2px solid #dc2626",
        },
      });
      setShowConfirmModal(null);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression", {
        style: {
          background: "#000",
          color: "#fff",
          border: "2px solid #dc2626",
        },
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Grouper les leçons par cours
  const lessonsByCourse = courses.map((course) => ({
    ...course,
    lessons: localLessons.filter((l) => l.course.id === course.id),
  }));

  return (
    <motion.div className="min-h-screen bg-white dark:bg-black text-black dark:text-white  space-y-12 max-w-5xl mx-auto ">
      <Toaster position="top-right" />
      <div className="mb-12">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-4 font-bold text-black dark:text-white tracking-wide">
            <Link
              href="/admin"
              className="hover:text-red-600 cursor-pointer transition-colors duration-200 border-2 border-black dark:border-white px-3 py-1"
            >
              ADMINISTRATION
            </Link>
            <span className="text-2xl font-black">→</span>
            <span className="text-red-600 font-black">LEÇONS</span>
          </div>
        </nav>

        {/* Title + Stats + CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div>
            <h1 className="font-black text-6xl tracking-wide text-black dark:text-white mb-4 uppercase leading-none">
              GESTION
              <br />
              <span className="text-red-600">DES LEÇONS</span>
            </h1>
            <div className="h-1 bg-red-600 w-32 mb-6" />
            <p className="font-bold text-xl text-black dark:text-white tracking-wide">
              {lessons.length} LEÇON{lessons.length > 1 ? "S" : ""} DISPONIBLE
            </p>
          </div>

          <Link href="/admin/lessons/new">
            <button className="bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102">
              <div className="flex items-center gap-4">
                <Plus className="w-5 h-5" />
                CRÉER UNE LEÇON
              </div>
            </button>
          </Link>
        </div>
      </div>

      {lessonsByCourse.map((course) => (
        <div
          key={course.id}
          className="border-2 border-black dark:border-white p-8 space-y-6"
        >
          <h2 className="text-5xl font-black uppercase tracking-wide">
            {course.title}
          </h2>

          <div className="grid gap-4">
            {course.lessons.length === 0 ? (
              <p className="font-bold border-2 border-black dark:border-white p-4">
                Aucune leçon dans ce cours.
              </p>
            ) : (
              course.lessons.map((lesson) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-2 border-black dark:border-white p-4 flex justify-between items-center hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <span className="font-bold">
                    {lesson.title} ({lesson.duration})
                  </span>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-black dark:border-white px-4 py-2 font-bold uppercase"
                      onClick={() =>
                        router.push(`/admin/lessons/${lesson.id}/edit`)
                      }
                    >
                      <Edit className="inline w-5 h-5 mr-2" /> Modifier
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-red-600 bg-red-600 text-white px-4 py-2 font-bold uppercase disabled:opacity-50"
                      onClick={() => setShowConfirmModal(lesson.id)}
                      disabled={isDeleting === lesson.id}
                    >
                      {isDeleting === lesson.id ? (
                        <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                      ) : (
                        <Trash className="inline w-5 h-5 mr-2" />
                      )}
                      Supprimer
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <Link
            href="/admin/lessons/new"
            className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 border-2 border-red-600 font-black uppercase tracking-wide hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            Ajouter une leçon <Plus className="w-6 h-6" />
          </Link>
        </div>
      ))}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-black border-2 border-black dark:border-white p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-black mb-4">
                Confirmer la suppression
              </h2>
              <p className="font-bold mb-6">
                Supprimer :{" "}
                <span className="text-red-600">
                  {localLessons.find((l) => l.id === showConfirmModal)?.title}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmModal(null)}
                  className="px-6 py-2 border-2 border-black dark:border-white font-bold uppercase"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(showConfirmModal)}
                  disabled={isDeleting === showConfirmModal}
                  className="px-6 py-2 bg-red-600 text-white border-2 border-red-600 font-bold uppercase disabled:opacity-50"
                >
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
