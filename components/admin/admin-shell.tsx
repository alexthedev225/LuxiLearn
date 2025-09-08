"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  LogOut,
  ChevronDown,
  Plus,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

type NavSubItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: NavSubItem[];
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() ?? "";

  const navItems: NavItem[] = [
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

  const toggleSubMenu = (label: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Empêche la propagation de l'événement click au document
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/";
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gestion des clics en dehors (pour desktop et mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop =
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node);
      const isOutsideMobile =
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node);
      if (expandedMenu && (isOutsideDesktop || isOutsideMobile)) {
        setExpandedMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expandedMenu]);

  return (
    <div
      className={`${darkMode ? "dark" : ""} min-h-screen bg-white dark:bg-black text-black dark:text-white`}
    >
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 border-black dark:border-white flex items-center justify-between px-4 py-4 lg:px-32"
      >
        <div className="flex items-center gap-2 min-w-[150px]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white bg-black text-white font-black text-sm uppercase tracking-wide hover:translate-y-[-2px] transition-transform duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Retour au site</span>
          </Link>
        </div>

        {/* Nav desktop */}
        <div
          ref={menuContainerRef}
          className="hidden lg:flex items-center gap-6"
        >
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
                    onClick={(e) => toggleSubMenu(item.label, e)}
                  >
                    <Icon
                      className={
                        isActive ? "text-red-600" : "text-black dark:text-white"
                      }
                    />
                    <span
                      className={
                        isActive ? "text-red-600" : "text-black dark:text-white"
                      }
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide text-sm hover:translate-y-[-1px] transition-transform duration-200"
                  >
                    <Icon
                      className={
                        isActive ? "text-red-600" : "text-black dark:text-white"
                      }
                    />
                    <span
                      className={
                        isActive ? "text-red-600" : "text-black dark:text-white"
                      }
                    >
                      {item.label}
                    </span>
                  </Link>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {item.subItems && isExpanded && (
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
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Logout & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center gap-2 px-3 py-2 border-2 border-red-600 text-red-600 font-bold uppercase tracking-wide text-sm hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
          </button>

          <button
            className="lg:hidden p-2 border-2 border-black dark:border-white rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
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
                      <>
                        <button
                          className="flex items-center gap-2 px-3 py-2 border-2 border-black dark:border-white font-bold uppercase tracking-wide w-full text-left hover:translate-y-[-1px] transition-transform duration-200"
                          onClick={(e) => toggleSubMenu(item.label, e)}
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
                            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        {/* Submenu mobile */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4"
                            >
                              {item.subItems.map((sub) => {
                                const SubIcon = sub.icon;
                                const isSubActive = pathname === sub.path;
                                return (
                                  <Link
                                    key={sub.path}
                                    href={sub.path}
                                    onClick={() => {
                                      setExpandedMenu(null);
                                      setMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                                      isSubActive
                                        ? "text-red-600"
                                        : "text-black dark:text-white"
                                    }`}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                    <span>{sub.label}</span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
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

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 border-2 border-red-600 text-red-600 font-bold uppercase tracking-wide w-full text-left hover:bg-red-600 hover:text-white transition-colors duration-200 mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
}
