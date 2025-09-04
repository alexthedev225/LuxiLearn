import AvailableCoursesSection from "./AvailableCoursesSection";
import FaqSection from "./FaqSection";
import { HeroSection } from "./HeroSection";
import WhyLuxiDev from "./WhyLuxiDev";

export default async function Home() {
  const faqs = [
    {
      question: "Est-ce vraiment 100% gratuit ?",
      answer:
        "Oui. Aucun abonnement. J'ai décidé de rendre ce savoir accessible à tous.",
    },
    {
      question: "Dois-je créer un compte ?",
      answer:
        "Non. Tu peux accéder aux cours immédiatement, sans aucune inscription.",
    },
    {
      question: "Est-ce que c'est pour les débutants ?",
      answer:
        "Absolument. Les premiers cours t'accompagnent dès le départ, étape par étape.",
    },
    {
      question: "Je peux suivre les cours à mon rythme ?",
      answer: "Oui. Tu es libre d'avancer comme tu veux, quand tu veux.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white space-y-12">
      <main className="flex-1 py-32 ">
        {/* Hero */}
        <HeroSection />

        {/* Separator */}
        <div className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white max-w-6xl mx-auto my-8" />

        <AvailableCoursesSection />

        <div className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white max-w-6xl mx-auto my-8" />

        {/* Pourquoi LuxiDev */}
        <WhyLuxiDev />

        <div className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white max-w-6xl mx-auto my-8" />

        {/* FAQ */}
        <FaqSection faqs={faqs} />
      </main>
    </div>
  );
}
