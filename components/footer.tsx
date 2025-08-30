export default function Footer() {
  return (
    <footer className="relative   border-t-2 border-black dark:border-white py-6  ">
      <div className="max-w-6xl mx-auto px-8 grid">
        {/* Texte du footer */}
        <div className="text-center text-sm font-bold uppercase tracking-wide text-black dark:text-white">
          © {new Date().getFullYear()} LuxLearn. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
