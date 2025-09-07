"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Award, BookOpen } from "lucide-react";

const features = [
  {
    text: "LEÇONS CLAIRES ET PRÉCISES",
    description: "Des explications écrites simples et structurées",
    icon: Zap,
  },
  {
    text: "APPRENTISSAGE ACTIF",
    description: "Quiz et exercices après chaque leçon",
    icon: Target,
  },
  {
    text: "PROGRESSION ASSURÉE",
    description: "Une montée en compétence du débutant à l’expert",
    icon: Award,
  },
];

export const PédagogieSection = () => {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-white dark:bg-black  overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 gap-8 sm:gap-10 px-4 sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center gap-1.5 p-1.5 border-2 border-red-600 w-max mx-auto uppercase font-bold text-red-600 text-xs"
        >
          <BookOpen className="w-3 h-3" />
          MÉTHODE D'ENSEIGNEMENT
        </motion.div>

        {/* Titres */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase text-black dark:text-white leading-tight"
            style={{ fontSize: "clamp(1.875rem, 5vw, 2.5rem)" }}
          >
            UNE PÉDAGOGIE
          </h2>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide uppercase text-red-600 leading-tight mb-4 sm:mb-6"
            style={{ fontSize: "clamp(1.875rem, 5vw, 2.5rem)" }}
          >
            RÉVOLUTIONNAIRE
          </h2>
          <p
            className="text-base sm:text-lg  text-black dark:text-white max-w-lg sm:max-w-2xl mx-auto leading-relaxed"
          
          >
            Oublie les cours interminables et ennuyeux. Chaque minute compte.
            Notre approche pratique et progressive garantit des résultats
            rapides et durables.
          </p>
        </motion.div>

      
          {/* Features */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between max-w-xl gap-3 p-4 sm:p-6  bg-white dark:bg-black hover:translate-y-1 hover:translate-x-1 transition-transform duration-200"
              >
                <div className="p-3 bg-red-600 text-white flex items-center justify-center w-10 h-10 rounded-full">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 ml-4">
                  <h4 className="text-lg sm:text-xl font-bold text-black dark:text-white">
                    {feature.text}
                  </h4>
                  <p className="text-sm sm:text-base text-black dark:text-white mt-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
};
