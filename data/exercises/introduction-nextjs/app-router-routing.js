export default {
  description:
    "Créer une page dynamique qui affiche l'ID utilisateur passé en paramètre.",
  starterCode: `
// app/users/[id]/page.jsx
export default function UserProfile({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profil utilisateur #{params.id}</h1>
    </div>
  );
}
  `,
  solutionCode: `
// app/users/[id]/page.jsx
export default function UserProfile({ params }) {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Profil utilisateur #{params.id}</h1>
      <p className="text-gray-300">Bienvenue sur le profil de l'utilisateur {params.id}.</p>
      <a href="/" className="text-yellow-500 hover:underline">Retour à l'accueil</a>
    </div>
  );
}
  `,
  validate: ({ code, filename }) => {
    // Vérifie que le chemin/fichier contient bien /[id]/page.jsx ou .js/.tsx/.ts
    if (!/\[id\][\\/]{1}page\.(js|jsx|ts|tsx)$/.test(filename)) {
      return {
        success: false,
        message: "Le fichier doit être une page dynamique : `[id]/page.jsx`.",
      };
    }

    // Vérifie que la fonction reçoit params en argument
    const hasParamsProp =
      /function\s+\w+\s*\(\s*\{\s*params\s*\}\s*\)/.test(code) ||
      /const\s+\w+\s*=\s*\(\s*\{\s*params\s*\}\s*\)\s*=>/.test(code);

    if (!hasParamsProp) {
      return {
        success: false,
        message: "Le composant doit accepter `params` en tant que props.",
      };
    }

    // Vérifie que params.id est utilisé dans le JSX (simple recherche)
    const usesParamsId = /params\.id/.test(code);

    if (!usesParamsId) {
      return {
        success: false,
        message: "`params.id` doit être affiché dans le JSX.",
      };
    }

    return { success: true };
  },
};
