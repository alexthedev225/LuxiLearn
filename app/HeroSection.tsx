"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import Link from "next/link";
import { Play, Pause } from "lucide-react";

// Enregistre le langage JS
hljs.registerLanguage("javascript", javascript);

const bienvenueCode = `
function salutAmi(nom) {
  return {
    message: \`Salut \${nom} ! Prêt à coder ✨\`,
    demarrer: () => 
    console.log(\`🚀 \${nom} démarre sa quête !\`)
  };
}

const toi = salutAmi("Futur Dev");
toi.demarrer();
`;

const TypewriterCode = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const styleRef = useRef<HTMLLinkElement | null>(null);

  // Fonction pour charger et gérer les styles CSS
  const loadHighlightJsStyles = async (newTheme: "light" | "dark") => {
    if (theme === newTheme) return; // Éviter de recharger inutilement
    setTheme(newTheme);

    // Supprimer l'ancien style s'il existe
    if (styleRef.current) {
      styleRef.current.remove();
      styleRef.current = null;
    }

    // Charger le nouveau style
    const styleUrl =
      newTheme === "dark"
        ? "highlight.js/styles/atom-one-dark.css"
        : "highlight.js/styles/atom-one-light.css";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/styles/${styleUrl}`; // Assure-toi que les fichiers CSS sont accessibles dans ton dossier public ou via un chemin correct
    document.head.appendChild(link);
    styleRef.current = link;

    // Réappliquer la coloration syntaxique après le chargement du style
    setTimeout(() => {
      const highlighted = hljs.highlight(displayedCode, {
        language: "javascript",
      }).value;
      setHighlightedCode(highlighted);
    }, 100); // Petit délai pour s'assurer que le CSS est chargé
  };

  // Détecter le thème (clair ou sombre)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      loadHighlightJsStyles(e.matches ? "dark" : "light");
    };

    // Charger le thème initial
    loadHighlightJsStyles(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Effet machine à écrire avec boucle
  useEffect(() => {
    if (!isAnimating) return;

    if (currentIndex < bienvenueCode.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(bienvenueCode.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 35);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedCode("");
        setCurrentIndex(0);
      }, 5000); // Pause de 5 secondes avant redémarrage
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, isAnimating]);

  // Appliquer la coloration syntaxique
  useEffect(() => {
    const highlighted = hljs.highlight(displayedCode, {
      language: "javascript",
    }).value;
    setHighlightedCode(highlighted);
  }, [displayedCode]);

  // Contrôle de l'animation (pause/reprise)
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 p-3 sm:p-4 font-mono text-xs sm:text-sm leading-snug w-full max-w-[90vw] sm:max-w-[500px] min-h-[330px] sm:min-h-[330px] max-h-[330px] flex flex-col shadow-lg rounded-lg"
    >
      {/* Header inspiré d'un éditeur de code */}
      <div className="flex justify-between items-center mb-2 sm:mb-3 border-b border-neutral-300 dark:border-neutral-700 pb-1 sm:pb-2">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm font-semibold">
            main.js
          </span>
          <button
            onClick={toggleAnimation}
            className="text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700"
          >
            {isAnimating ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code avec animation de fondu */}
      <AnimatePresence>
        <motion.pre
          key={displayedCode ? "code" : "empty"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 w-full overflow-auto px-3 sm:px-4 bg-neutral-50 dark:bg-neutral-950 rounded"
        >
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </motion.pre>
      </AnimatePresence>

      {/* Curseur */}
      {isAnimating && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-3 sm:h-4 bg-blue-500 ml-1 mt-1"
        />
      )}
    </motion.div>
  );
};

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  return (
    <section className="relative bg-white dark:bg-black text-black dark:text-white py-20 px-6">
      <div className="relative z-10 w-full  sm:max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 ">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-2 sm:space-y-2 w-full lg:w-1/2 flex-shrink-0 text-center lg:text-left items-center lg:items-start "
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            Deviens
          </h1>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            développeur
          </h1>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-red-600 font-black uppercase tracking-wide"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            d'exception
          </h1>
          <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-300 mt-2 max-w-lg lg:max-w-md  ">
            Plonge dans un univers où chaque ligne de code que tu écris te
            rapproche de la maîtrise, où tes projets prennent vie, et où chaque
            défi devient une étape vers ton avenir de développeur d’exception.
          </p>
          <div className="flex mt-4">
            <Link href="/courses">
              <motion.button
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white font-bold uppercase tracking-wide px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black dark:border-white cursor-pointer text-xs sm:text-sm rounded"
              >
                Commencer maintenant
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Code animé */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.95,
            y: isVisible ? 0 : 10,
          }}
          transition={{ duration: 0.6 }}
          className="hidden sm:flex justify-center lg:justify-end items-center w-full lg:w-1/2 flex-shrink-0 "
        >
          <TypewriterCode />
        </motion.div>
      </div>
    </section>
  );
};
