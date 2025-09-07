"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowLeft, Edit } from "lucide-react";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

// ReactMarkdown dynamique pour le SSR
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function LessonDetailClient({
  lesson: initialLesson,
}: {
  lesson: any;
}) {
  const router = useRouter();
  const [lesson] = useState(initialLesson);

  const dedent = (str: string) => {
    const lines = str.split("\n");
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
    const minIndent = Math.min(
      ...lines.filter((l) => l.trim()).map((l) => l.match(/^(\s*)/)![1].length)
    );
    return lines.map((line) => line.slice(minIndent)).join("\n");
  };

  const unescapeBackticks = (str: string) => str.replace(/\\`/g, "`");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-red-600 font-bold text-sm tracking-wide mb-6">
            <BookOpen className="w-4 h-4" />
            DÉTAILS DE LA LEÇON
          </div>
          <h1 className="font-black text-5xl tracking-wide text-black dark:text-white uppercase mb-4">
            <span className="text-red-600">{lesson.title}</span>
          </h1>
        </div>

        {/* Lesson Content */}
        <div className="p-6 bg-white dark:bg-black border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1">
          <h2 className="font-black text-2xl tracking-wide text-black dark:text-white uppercase mb-4">
            CONTENU
          </h2>
          <div className="prose max-w-none text-black dark:text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {unescapeBackticks(dedent(lesson.content))}
            </ReactMarkdown>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => router.push(`/courses/${lesson.course.slug}`)}
            className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2"
          >
            <ArrowLeft className="w-5 h-5" />
            RETOUR
          </button>
          <button
            onClick={() => router.push(`/admin/lessons/${lesson.id}/edit`)}
            className="inline-flex items-center gap-3 bg-red-600 text-white font-black text-lg tracking-wide px-8 py-4 border-2 border-black dark:border-white transition-transform duration-200 hover:translate-x-2 hover:translate-y-2 hover:scale-102"
          >
            <Edit className="w-5 h-5" />
            MODIFIER LA LEÇON
          </button>
        </div>
      </div>
    </div>
  );
}
