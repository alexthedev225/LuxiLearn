export default {
  description: "Ajoute un paragraphe et un bouton à la page d'accueil.",
  starterCode: `
// app/page.jsx
export default function Home() {
  return (
    <div>
      <h1>Mon projet Next.js</h1>
      {/* Ajoute un paragraphe ici */}
      {/* Ajoute un bouton ici */}
    </div>
  );
}
  `,
  solutionCode: `
// app/page.jsx
export default function Home() {
  return (
    <div>
      <h1>Mon projet Next.js</h1>
      <p>Bienvenue dans mon application Next.js !</p>
      <button>Cliquez ici</button>
    </div>
  );
}
  `,
  validate: ({ code }) => {
    // Recherche simple de la balise <p>
    const hasParagraph = /<p[\s\S]*?>[\s\S]*?<\/p>/.test(code);
    // Recherche simple de la balise <button>
    const hasButton = /<button[\s\S]*?>[\s\S]*?<\/button>/.test(code);

    if (!hasParagraph) {
      return {
        success: false,
        message: "Tu dois ajouter un paragraphe `<p>` dans la page.",
      };
    }

    if (!hasButton) {
      return {
        success: false,
        message: "Tu dois ajouter un bouton `<button>` dans la page.",
      };
    }

    return { success: true };
  },
};
