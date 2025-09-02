"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, BookOpen, Star } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = "/admin"; // redirection automatique
      } else {
        const data = await res.json();
        setError(data.error || "Erreur inconnue");
      }
    } catch {
      setError("Erreur serveur");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  // Separator component for neo-brutalist style
  const Separator = () => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-4xl mx-auto"
      aria-hidden="true"
    />
  );

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans px-4 sm:px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-24 sm:pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-1.5 mb-4 border-2 border-black dark:border-white px-2 py-0.5 text-xs font-bold uppercase text-red-600">
            <Lock className="w-3 h-3 text-red-600" />
            Espace Admin
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            Gérer <span className="text-red-600">LuxiLearn</span> avec Puissance
          </h1>
          <p
            className="text-sm sm:text-base font-bold max-w-lg mb-6"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Connectez-vous pour accéder à votre tableau de bord admin et piloter
            vos cours, étudiants et contenus.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
            <motion.div
              className="border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <BookOpen className="w-4 h-4 sm:w-5 h-5 text-red-600" />
              <div className="text-xl sm:text-2xl font-black text-red-600">
                50+
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase text-center">
                Cours
              </div>
            </motion.div>
            <motion.div
              className="border-2 border-black dark:border-white p-3 sm:p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Star className="w-4 h-4 sm:w-5 h-5 text-red-600" />
              <div className="text-xl sm:text-2xl font-black text-red-600">
                98%
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase text-center">
                Satisfaction
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Separator />

      {/* Login Form Section */}
      <div className="max-w-4xl mx-auto py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-neutral-950 border-2 border-black dark:border-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto"
        >
          <h2
            className="text-xl sm:text-2xl font-black uppercase tracking-wide mb-6"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
          >
            Connexion Admin
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-600" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nom d'utilisateur"
                className="w-full pl-10 pr-4 py-2 border-2 border-black dark:border-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base font-bold bg-white dark:bg-neutral-950"
                aria-label="Nom d'utilisateur"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Mot de passe"
                className="w-full pl-10 pr-4 py-2 border-2 border-black dark:border-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base font-bold bg-white dark:bg-neutral-950"
                aria-label="Mot de passe"
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full bg-red-600 text-white font-black uppercase py-2 rounded border-2 border-black dark:border-white hover:bg-red-700 transition-all duration-200 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2"
            >
              Se connecter
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 mt-4 text-center text-xs sm:text-sm font-bold"
            >
              {error}
            </motion.p>
          )}
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-xs sm:text-sm font-bold text-red-600 hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </motion.div>
      </div>

      <Separator />

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto py-10 sm:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2
            className="text-2xl sm:text-3xl font-black uppercase tracking-wide mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
          >
            Explorez <span className="text-red-600">LuxiLearn</span>
          </h2>
          <p
            className="text-sm sm:text-base font-bold max-w-md mx-auto mb-6"
            style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
          >
            Découvrez nos cours gratuits et commencez votre apprentissage dès
            aujourd’hui.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 border-2 border-black dark:border-white bg-red-600 text-white font-black uppercase px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wide hover:shadow-lg transition-all duration-200 rounded"
          >
            Retour à l’Accueil
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
