"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

type FaqSectionBrutalProps = {
  faqs?: Faq[];
};

const defaultFaqs: Faq[] = [
  {
    question: "LuxiDev est-il vraiment gratuit ?",
    answer:
      "Oui, tous nos cours sont 100% gratuits, sans frais cachés ni version premium.",
  },
  {
    question: "Quel niveau pour commencer ?",
    answer:
      "Nos cours conviennent à tous, des débutants complets aux développeurs avancés. Chaque cours indique son niveau.",
  },
  {
    question: "Combien de temps pour maîtriser React ?",
    answer:
      "Avec quelques heures par semaine, les bases de React s'acquièrent en 4-6 semaines. La maîtrise demande plus de pratique.",
  },
  {
    question: "Y a-t-il un certificat ?",
    answer:
      "Pas de certificat pour l'instant. Nos projets pratiques et ton portfolio GitHub valoriseront tes compétences.",
  },
  {
    question: "Comment obtenir de l'aide ?",
    answer:
      "Rejoins notre communauté Discord active pour des réponses rapides de mentors et étudiants.",
  },
  {
    question: "Les cours sont-ils à jour ?",
    answer:
      "Oui, nous mettons nos cours à jour régulièrement pour suivre les dernières tendances JavaScript.",
  },
];

export default function FaqSectionBrutal({
  faqs = defaultFaqs,
}: FaqSectionBrutalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-10 sm:py-12 px-4 sm:px-6 ">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 ">
        {/* Texte à gauche */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border-2 border-red-600 text-red-600 font-bold uppercase text-xs rounded mb-3">
            <HelpCircle className="w-3 h-3" />
            Support
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase text-neutral-900 dark:text-neutral-100 leading-tight mb-2">
            Questions
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase text-red-600 leading-tight mb-4">
            fréquentes
          </h2>
          <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white max-w-md sm:max-w-lg leading-relaxed">
            Tout ce que tu dois savoir pour commencer avec LuxiLearn.
          </p>

          <p className="mt-6 text-sm sm:text-base italic text-neutral-700 dark:text-neutral-200 max-w-md">
            « Avec LuxiLearn, apprendre JavaScript, React et Next.js devient
            simple et motivant. »
          </p>
        </div>

        {/* FAQ à droite */}
        <div className="flex-1 flex flex-col gap-4">
          {faqs.map((faq: Faq, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative border border-neutral-300 dark:border-neutral-700 p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Ligne d'accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600" />

              <button
                onClick={() => toggleFaq(index)}
                className="relative z-10 w-full text-left flex items-center justify-between focus:outline-none p-2 sm:p-3"
                aria-expanded={openIndex === index}
                aria-label={`Question: ${faq.question}`}
              >
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors duration-200">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-red-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 sm:pt-3">
                      <p className="text-sm sm:text-base font-bold text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
