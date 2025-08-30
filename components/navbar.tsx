"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/courses", label: "Cours" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Neo-Brutalist Separator for Mobile Menu
const Separator = () => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.2 }}
    className="w-full h-px sm:h-0.5 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2"
    aria-hidden="true"
  />
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-b-2 border-black dark:border-white"
    >
      <nav className="max-w-4xl mx-auto py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide text-red-600"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
            aria-label="Retour à l'accueil"
          >
            LuxiLearn
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 px-1.5 py-0.5 border-2 border-black dark:border-white font-bold uppercase tracking-wide text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 hover:text-red-600 hover:border-red-600 hover:-translate-y-0.5 transition-all duration-200 rounded"
              aria-current={href === "/" ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="p-1 border-2 border-black dark:border-white text-neutral-900 dark:text-neutral-100 hover:text-red-600 hover:border-red-600 transition-all duration-200 rounded"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "100vh" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t-2 border-black dark:border-white bg-white dark:bg-neutral-950 overflow-hidden"
          >
            <nav className="flex flex-col p-2 sm:p-3 gap-2 sm:gap-3">
              {links.map(({ href, label }, index) => (
                <div key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-1 px-1.5 py-0.5 border-2 border-black dark:border-white font-bold uppercase tracking-wide text-xs text-neutral-900 dark:text-neutral-100 hover:text-red-600 hover:border-red-600 hover:-translate-y-0.5 transition-all duration-200 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={href === "/" ? "page" : undefined}
                  >
                    {label}
                  </Link>
                  {index < links.length - 1 && <Separator />}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
