"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Zap,
  Heart,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ArrowRight,
  BookOpen,
  Star,
  Play,
  Check,
} from "lucide-react";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "50+", label: "Cours", icon: BookOpen },
    { number: "1000+", label: "Étudiants", icon: Users },
    { number: "98%", label: "Satisfaction", icon: Star },
    { number: "24/7", label: "Support", icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Des cours de haute qualité pour tous.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Technologies modernes pour apprendre.",
    },
    {
      icon: Heart,
      title: "Accessibilité",
      description: "Cours gratuits pour tous.",
    },
    {
      icon: Lightbulb,
      title: "Pratique",
      description: "Projets concrets pour maîtriser.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Lancement",
      description: "Début avec les premiers cours web.",
      icon: Play,
      status: "completed",
    },
    {
      year: "2024",
      title: "1000 Étudiants",
      description: "Cap des 1000 étudiants atteint.",
      icon: Users,
      status: "completed",
    },
    {
      year: "2024",
      title: "Cours Avancés",
      description: "Parcours React, Next.js, mobile.",
      icon: Award,
      status: "completed",
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Cours traduits, nouveaux marchés.",
      icon: TrendingUp,
      status: "current",
    },
  ];

  // Neo-Brutalist Separator
  const Separator = () => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-5xl mx-auto"
      aria-hidden="true"
    />
  );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans mx-4 sm:mx-6">
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto pt-32 ">
        <section className="grid lg:grid-cols-2 gap-6 sm:gap-8 pb-10">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="inline-flex items-center gap-1.5 mb-4 border-2 border-black dark:border-white px-2 py-0.5 text-xs font-bold uppercase text-red-600"
              aria-label="Notre histoire"
            >
              <Heart className="w-3 h-3 text-red-600" />
              Notre histoire
            </div>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-3"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
            >
              L'histoire de <span className="text-red-600">LuxiLearn</span>
            </h1>

            <p
              className="text-sm sm:text-base font-bold mb-4 leading-snug"
              style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
            >
              Mission :{" "}
              <span className="text-red-600">Démocratiser l'apprentissage</span>{" "}
              du web avec des cours gratuits et pratiques.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.slice(0, 2).map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <stat.icon className="w-4 h-4 sm:w-5 h-5 text-red-600" />
                  <div className="text-xl sm:text-2xl font-black text-red-600">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col items-center gap-3 rounded-lg"
          >
            <div className="text-3xl sm:text-4xl">🎓</div>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wide mb-2">
              Philosophie
            </h3>
            <p className="text-xs sm:text-sm font-bold text-center">
              "Apprendre en faisant" - Théorie et pratique intensive.
            </p>
            <div className="grid grid-cols-1 gap-2 mt-3 w-full">
              {["Cours pratiques", "Communauté", "Projets réels"].map(
                (f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border-2 border-black dark:border-white p-2 rounded-lg"
                  >
                    <div className="w-4 h-4 flex items-center justify-center border-2 border-red-600 text-red-600 font-black text-xs">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm font-bold">{f}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </section>

        <Separator />

        {/* VALUES SECTION */}
        <section className="py-8 sm:py-10 grid lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              onHoverStart={() => setActiveValue(idx)}
              onHoverEnd={() => setActiveValue(null)}
              className={`border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-lg ${
                activeValue === idx ? "-translate-y-0.5" : ""
              }`}
            >
              <v.icon className="w-4 h-4 sm:w-5 h-5 text-red-600" />
              <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm font-bold">{v.description}</p>
            </motion.div>
          ))}
        </section>

        <Separator />

        {/* TIMELINE */}
        <section className="py-8 sm:py-10 grid gap-4 sm:gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 border-2 border-black dark:border-white p-3 sm:p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className={`p-2 rounded-full ${
                    m.status === "current"
                      ? "bg-red-600 text-white"
                      : "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                </div>
                <div className="text-base sm:text-lg font-black text-red-600">
                  {m.year}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 border-2 border-black dark:border-white p-2 sm:p-3 rounded-lg">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold">{m.description}</p>
                {m.status === "current" && (
                  <span className="text-red-600 font-black border-2 border-red-600 px-2 py-0.5 text-xs uppercase tracking-wide rounded">
                    En cours
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        <Separator />

        {/* STATS SECTION */}
        <section className="py-8 sm:py-10 grid lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <stat.icon className="w-4 h-4 sm:w-5 h-5 text-red-600" />
              <div className="text-xl sm:text-2xl font-black text-red-600">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </section>

        <Separator />

        {/* CTA */}
        <section className="pt-8 sm:pt-10 flex flex-col items-center gap-4 sm:gap-6 pb-20">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-2"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
          >
            Prêt à rejoindre ?
          </h2>
          <p
            className="text-sm sm:text-base font-bold text-center max-w-md sm:max-w-lg"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Rejoins des milliers d'étudiants pour transformer ta passion.
          </p>
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-black bg-red-600 text-white font-black uppercase px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wide hover:shadow-lg transition-all duration-200 rounded"
            >
              Commencer <ArrowRight className="inline w-4 h-4 ml-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-black bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-bold uppercase px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wide hover:shadow-lg transition-all duration-200 rounded"
            >
              Nos cours <BookOpen className="inline w-4 h-4 ml-1" />
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
