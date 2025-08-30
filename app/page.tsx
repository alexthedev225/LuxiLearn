import AvailableCoursesSection from "./AvailableCoursesSection";
import FaqSection from "./FaqSection";
import { HeroSection } from "./HeroSection";
import { PédagogieSection } from "./PédagogieSection";
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
    <div className="  relative w-full min-h-screen flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white  space-y-12">
      <main className="flex-1 overflow-y-auto  border-black dark:border-white py-32">
        {/* Hero */}
        <HeroSection />

        {/* Separator */}
        <div className="border-t-2 border-black dark:border-white" />

        {/* <PédagogieSection /> */}
{/* 
        <div className="border-t-2 border-black dark:border-white" /> */}

        <AvailableCoursesSection />

        <div className="border-t-2 border-black dark:border-white" />

        {/* Pourquoi LuxiDev */}
        <WhyLuxiDev />

        <div className="border-t-2 border-black dark:border-white" />

        {/* FAQ */}
        <FaqSection faqs={faqs} />
      </main>
    </div>
  );
}
