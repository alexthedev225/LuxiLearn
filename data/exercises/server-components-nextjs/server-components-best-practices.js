export default {
  description:
    "Crée une page Server Component avec une gestion d’erreurs pour afficher un message statique.",
  starterCode: `
// app/message/page.jsx
export default async function MessagePage() {
  const message = "Bonjour depuis le serveur !";
  return (
    <div>
      <h1>Message</h1>
      {/* Affiche le message */}
    </div>
  );
}
  `,
  solutionCode: `
// app/message/page.jsx
export default async function MessagePage() {
  try {
    const message = "Bonjour depuis le serveur !";
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Message</h1>
        <p className="text-gray-300">{message}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Erreur</h1>
        <p className="text-gray-300">Impossible de charger le message.</p>
      </div>
    );
  }
}
  `,
  validate: ({ code }) => {
    // Vérifie que la fonction async exportée default s'appelle MessagePage
    const hasFunction =
      /export\s+default\s+async\s+function\s+MessagePage\s*\(/.test(code);

    // Vérifie la présence d'un try/catch dans la fonction
    const hasTryCatch =
      /try\s*{[\s\S]*}catch\s*\(\s*error\s*\)\s*{[\s\S]*}/.test(code);

    // Vérifie que le message est affiché dans un paragraphe dans le bloc try
    const hasMessageParagraph = /<p[^>]*>{\s*message\s*}<\/p>/.test(code);

    // Vérifie que dans le catch on affiche un message d'erreur statique
    const hasCatchMessage =
      /<p[^>]*>Impossible de charger le message\.<\/p>/.test(code);

    if (!hasFunction)
      return "La fonction async exportée par défaut doit s'appeler MessagePage.";
    if (!hasTryCatch)
      return "Le composant doit utiliser un bloc try/catch pour gérer les erreurs.";
    if (!hasMessageParagraph)
      return "Le message doit être affiché dans un paragraphe à l'intérieur du try.";
    if (!hasCatchMessage)
      return "Le message d'erreur statique doit être affiché dans le bloc catch.";

    return true;
  },
};
