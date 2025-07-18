"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiPrisma,
  SiJsonwebtokens,
  SiStripe,
  SiCloudinary,
} from "react-icons/si";
import { IconType } from "react-icons";

export default function HomePage() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: "Projets Concrets",
      desc: "Construis des applications réelles avec des projets pratiques et concrets.",
    },
    {
      title: "Guidé & Progressif",
      desc: "Chaque cours t'accompagne étape par étape dans ton apprentissage.",
    },
    {
      title: "100% Gratuit",
      desc: "Aucun compte requis, aucun paiement, juste du contenu libre et accessible.",
    },
    {
      title: "Stack Moderne",
      desc: "Apprends les technologies les plus demandées sur le marché actuel.",
    },
  ];

  const techStack = [
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Prisma", Icon: SiPrisma, color: "#2D3748" },
    { name: "Auth JWT", Icon: SiJsonwebtokens, color: "#000000" },
    { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
    { name: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

 function TechCard({
   name,
   Icon,
 }: {
   name: string;
   Icon: IconType;
 }) {
   return (
     <div className="group relative p-6 rounded-xl border border-border bg-background hover:bg-content2 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-background-dark dark:hover:bg-content2-dark">
       <div className="flex flex-col items-center text-center">
         <Icon
           size={40}
           className="mb-3 group-hover:scale-110 transition-transform duration-300"
           style={{ color: undefined }}
         />
         <span className="text-sm font-medium text-foreground/80 dark:text-foreground-dark/80">
           {name}
         </span>
       </div>
     </div>
   );
 }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden sm:rounded-2xl sm:m-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-200 via-rose-200 to-background dark:from-red-950 dark:via-rose-950 dark:to-background-dark rounded-2xl" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-rose-500 rounded-full blur-3xl opacity-60 dark:from-red-800 dark:to-rose-800" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500 to-red-500 rounded-full blur-3xl opacity-60 dark:from-rose-800 dark:to-red-800" />

        <div className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-200 px-4 py-2 text-sm font-medium text-red-700 border border-red-200">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span>Plateforme e-learning gratuite</span>
            </div>

            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Apprends le développement web{" "}
              <span className="bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-500 dark:to-rose-400 bg-clip-text text-transparent">
                moderne
              </span>
            </h1>

            <p className="mt-6 text-xl text-foreground/70 dark:text-white/90 max-w-3xl mx-auto leading-relaxed">
              Des cours écrits, clairs et progressifs. Pas de compte. Pas de
              pub. Juste toi, ton éditeur, et la progression.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="relative overflow-hidden rounded-xl px-8 py-4 bg-red-600 text-primary-foreground font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                onClick={() => router.push("/courses")}
              >
                <span className="relative z-10">Commencer maintenant</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                className="px-8 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground font-semibold text-lg hover:bg-content1 transition-all duration-300 hover:scale-105 dark:bg-background-dark/50 dark:hover:bg-content1-dark"
                onClick={() => router.push("/courses")}
              >
                Voir les cours
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi choisir <span className="text-red-600">LuxLearn</span> ?
            </h2>
            <p className="text-xl text-foreground/80 dark:text-white max-w-2xl mx-auto">
              Une approche moderne et efficace pour apprendre le développement
              web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl border border-border bg-content1 hover:bg-content2 transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-content1-dark dark:hover:bg-content2-dark ${
                  activeFeature === i ? "ring-2 ring-red-500/50" : ""
                }`}
              >
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-foreground/80 dark:text-white leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Tech Stack */}
      <section className="py-20 px-6 sm:rounded-2xl sm:m-10 relative overflow-hidden bg-content1 dark:bg-content1-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-red-200 via-rose-200 to-background dark:from-red-950 dark:via-rose-950 dark:to-background-dark rounded-2xl" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-rose-500 rounded-full blur-3xl opacity-60 dark:from-red-800 dark:to-rose-800" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500 to-red-500 rounded-full blur-3xl opacity-60 dark:from-rose-800 dark:to-red-800" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Technologies <span className="text-red-600">enseignées</span>
            </h2>
            <p className="text-xl text-foreground/90 dark:text-white">
              Maîtrise les outils les plus demandés du marché
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="hidden lg:grid lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {techStack.slice(0, 5).map(({ name, Icon }, i) => (
                <TechCard key={i} name={name} Icon={Icon} />
              ))}
            </div>

            <div className="hidden lg:grid lg:grid-cols-4 gap-4 max-w-2xl mx-auto mt-4">
              {techStack.slice(5).map(({ name, Icon }, i) => (
                <TechCard key={i} name={name} Icon={Icon} />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl lg:hidden">
              {techStack.map(({ name, Icon }, i) => {
                const isLast = i === techStack.length - 1;
                return (
                  <div
                    key={i}
                    className={`${isLast ? "col-span-2 md:col-span-1" : ""}`}
                  >
                    <TechCard name={name} Icon={Icon} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Philosophy */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            Notre philosophie
          </h2>
          <p className="text-xl text-foreground/80 dark:text-white leading-relaxed mb-8">
            Le savoir technique doit être{" "}
            <span className="text-red-600 font-semibold">
              libre et accessible
            </span>{" "}
            à tous. C'est pourquoi LuxLearn est 100% gratuit et ouvert à tous.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["Open source", "Cours écrits", "Moderne", "Communautaire"].map(
              (label, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-content1 text-foreground/80 border border-border hover:bg-content2 transition-colors dark:bg-content1-dark dark:text-foreground-dark/80 dark:hover:bg-content2-dark"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>
      {/* CTA Final */}
      <section className="relative py-20 px-6 bg-content1 dark:bg-content1-dark sm:rounded-2xl sm:m-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-200 via-rose-200 to-background dark:from-red-950 dark:via-rose-950 dark:to-background-dark rounded-2xl" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-rose-500 rounded-full blur-3xl opacity-60 dark:from-red-800 dark:to-rose-800" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-500 to-red-500 rounded-full blur-3xl opacity-60 dark:from-rose-800 dark:to-red-800" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            Prêt à{" "}
            <span className="bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-400 dark:to-rose-300  bg-clip-text text-transparent">
              progresser
            </span>{" "}
            ?
          </h2>
          <p className="text-xl text-foreground/90 dark:text-white mb-8">
            Rejoins des centaines d'apprenants autodidactes et commence ton
            parcours dès maintenant.
          </p>
          <button
            className="relative overflow-hidden rounded-xl px-10 py-5 bg-red-600 text-primary-foreground font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={() => router.push("/courses")}
          >
            <span className="relative z-10">Explorer les cours</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
}
