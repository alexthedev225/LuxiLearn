export default {
  description:
    "Crée une page d’accueil avec un Server Component affichant un titre et un message de bienvenue.",
  starterCode: `
// app/page.jsx
export default function Home() {
  return (
    <div>
      <h1>Mon site</h1>
      {/* Ajoute un message de bienvenue */}
    </div>
  );
}
  `,
  solutionCode: `
// app/page.jsx
export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Mon site</h1>
      <p className="text-gray-300">Bienvenue dans mon application Next.js avec Server Components !</p>
    </div>
  );
}
  `,
  validate: ({ code }) => {
    const hasFunction = /export\s+default\s+function\s+Home\s*\(/.test(code);
    const hasTitle = /<h1[^>]*>.*mon site.*<\/h1>/i.test(code);
    const hasParagraph = /<p[^>]*>.*bienvenue.*<\/p>/i.test(code);

    if (!hasFunction) {
      return "Le composant `Home` doit être une fonction exportée par défaut.";
    }
    if (!hasTitle) {
      return "Le titre `<h1>` doit contenir le texte 'Mon site'.";
    }
    if (!hasParagraph) {
      return "Il manque un paragraphe `<p>` avec un message de bienvenue.";
    }
    return true;
  },
};
