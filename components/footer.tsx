import { motion } from "framer-motion";

export default function Footer() {
  const Separator = () => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="w-full h-0.5 sm:h-1 bg-red-600 border-t border-b border-black dark:border-white transform skew-x-2 max-w-6xl mx-auto"
      aria-hidden="true"
    />
  );
  return (
    <>
      <Separator />
      <footer className="relative py-6  ">
        <div className="max-w-6xl mx-auto px-8 grid">
          {/* Texte du footer */}
          <div className="text-center text-sm font-bold uppercase tracking-wide text-black dark:text-white">
            © {new Date().getFullYear()} LuxLearn. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
