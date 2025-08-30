"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  Plus,
  Search,
  ArrowLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [closingMenu, setClosingMenu] = useState(false); // menu en train de se fermer

  const menuRef = useRef(null);

 

  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: BarChart3 },
    {
      label: "Cours",
      path: "/admin/courses",
      icon: BookOpen,
      subItems: [
        { label: "Tous les cours", path: "/admin/courses", icon: BookOpen },
        { label: "Créer un cours", path: "/admin/courses/new", icon: Plus },
      ],
    },
    {
      label: "Leçons",
      path: "/admin/lessons",
      icon: BookOpen,
      subItems: [
        { label: "Toutes les leçons", path: "/admin/lessons", icon: BookOpen },
        { label: "Créer une leçon", path: "/admin/lessons/new", icon: Plus },
      ],
    },
  ];

  const toggleSubMenu = (label) => {
    if (expandedMenu === label) {
      // si le menu est déjà ouvert, on ferme avec latence
      setClosingMenu(true);
      setTimeout(() => {
        setExpandedMenu(null);
        setClosingMenu(false);
      }, 200);
    } else {
      setExpandedMenu(label);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // déclenche fermeture avec latence
        setClosingMenu(true);
        setTimeout(() => {
          setExpandedMenu(null);
          setClosingMenu(false);
        }, 200); // durée de ton animation
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div
      className={`${darkMode ? "dark" : ""} min-h-screen bg-white dark:bg-black text-black dark:text-white`}
     
    >
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 border-black dark:border-white"
      >
        <div className="max-w-5xl mx-auto  py-4 flex items-center justify-between gap-6">
          {/* Bouton retour au site - gauche */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white bg-black text-white font-black text-sm uppercase tracking-wide hover:translate-y-[-2px] transition-transform duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour au site</span>
            </Link>
          </div>

          {/* Nav desktop - droite */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                item.subItems?.some((sub) => pathname.startsWith(sub.path));
              const Icon = item.icon;
              const isExpanded = expandedMenu === item.label;

              return (
                <div key={item.path} className="relative">
                  {item.subItems ? (
                    <button
                      className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide text-sm hover:translate-y-[-1px] transition-transform duration-200"
                      onClick={() => toggleSubMenu(item.label)}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-red-600"
                            : "text-black dark:text-white"
                        }`}
                      />
                      <span
                        className={
                          isActive
                            ? "text-red-600"
                            : "text-black dark:text-white"
                        }
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide text-sm hover:translate-y-[-1px] transition-transform duration-200"
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-red-600"
                            : "text-black dark:text-white"
                        }`}
                      />
                      <span
                        className={
                          isActive
                            ? "text-red-600"
                            : "text-black dark:text-white"
                        }
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.subItems && (isExpanded || closingMenu) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-black border-2 border-black dark:border-white z-20"
                    >
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.path;
                        return (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            onClick={() => setExpandedMenu(null)}
                          >
                            <motion.div
                              whileHover={{ x: 2 }}
                              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 border-black dark:border-white ${
                                isSubActive
                                  ? "text-red-600"
                                  : "text-black dark:text-white"
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{sub.label}</span>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed top-16 left-0 right-0 bg-white dark:bg-black border-2 border-black dark:border-white z-40"
            >
              <nav className="px-4 py-4">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    item.subItems?.some((sub) => pathname.startsWith(sub.path));
                  const Icon = item.icon;
                  const isExpanded = expandedMenu === item.label;

                  return (
                    <div key={item.path} className="mb-2">
                      {item.subItems ? (
                        <button
                          className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide w-full text-left hover:translate-y-[-1px] transition-transform duration-200"
                          onClick={() => toggleSubMenu(item.label)}
                        >
                          <Icon
                            className={
                              isActive
                                ? "text-red-600"
                                : "text-black dark:text-white"
                            }
                          />
                          <span
                            className={
                              isActive
                                ? "text-red-600"
                                : "text-black dark:text-white"
                            }
                          >
                            {item.label}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide hover:translate-y-[-1px] transition-transform duration-200"
                        >
                          <Icon
                            className={
                              isActive
                                ? "text-red-600"
                                : "text-black dark:text-white"
                            }
                          />
                          <span
                            className={
                              isActive
                                ? "text-red-600"
                                : "text-black dark:text-white"
                            }
                          >
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pt-16 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-y-auto border-2 border-black dark:border-white py-20"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
