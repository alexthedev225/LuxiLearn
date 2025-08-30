"use client";

import React from "react";
import { SiJavascript, SiReact, SiNextdotjs } from "react-icons/si";

import { motion } from "framer-motion";
import { Code2, Eye, Heart, Users, Sparkles } from "lucide-react";

const items = [
  {
    title: "JavaScript",
    description: "Maîtrise les bases et les concepts clés du langage.",
    
  },
  {
    title: "React",
    description: "Crée des interfaces modernes et interactives rapidement.",

  },
  {
    title: "Next.js",
    description:
      "Déploie des applications performantes et fullstack avec Next.js.",

  },
  {
    title: "Pratique",
    description:
      "Applique tes connaissances avec des projets concrets et guidés.",

  },
];



export default function WhyLuxiDevModern() {
  return (
    <section className="relative w-full py-10 sm:py-32 px-4 sm:px-6 min-h-screen">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Texte à gauche */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left "
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border-2 border-red-600 text-red-600 font-bold uppercase text-xs rounded mb-3">
            <Sparkles className="w-3 h-3" />
            Nos avantages
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase text-neutral-900 dark:text-neutral-100 leading-tight mt-3 sm:mt-4 mb-2">
            Pourquoi choisir
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase text-red-600 leading-tight mb-3 sm:mb-4">
            LuxiDev
          </h2>

          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-md sm:max-w-lg leading-relaxed ">
            LuxiDev te guide pas à pas pour devenir un développeur compétent.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className=" flex items-center justify-center">
              <SiJavascript className="w-16 h-16 text-black dark:text-white" />
            </div>
            <div className=" flex items-center justify-center">
              <SiReact className="w-16 h-16 text-black dark:text-white" />
            </div>
            <div className=" flex items-center justify-center">
              <SiNextdotjs className="w-16 h-18 text-black dark:text-white" />
            </div>
          </div>
        </motion.div>

        {/* Cartes à droite */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-neutral-950 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-red-600 rounded-b-full" />

              {/* Titre */}
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-neutral-900 dark:text-neutral-100 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
