export default {
  description:
    "Créer une page dynamique qui affiche l'ID utilisateur passé en paramètre (via SSR avec App Router).",

  starterCode: `
// app/users/[id]/page.jsx
export default async function UserProfile({ params }) {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profil utilisateur #{id}</h1>
    </div>
  );
}
  `,

  solutionCode: `
// app/users/[id]/page.jsx
export default async function UserProfile({ params }) {
  const { id } = await params;
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Profil utilisateur #{id}</h1>
      <p className="text-gray-300">Bienvenue sur le profil de l'utilisateur {id}.</p>
      <a href="/" className="text-yellow-500 hover:underline">Retour à l'accueil</a>
    </div>
  );
}
  `,

  validate: ({ code, filename }) => {
    if (!/\[id\][\\/]{1}page\.(js|jsx|ts|tsx)$/.test(filename)) {
      return {
        success: false,
        message: "Le fichier doit être une page dynamique : `[id]/page.jsx`.",
      };
    }

    // Vérifie que la fonction est async et reçoit params en props
    if (
      !/export\s+default\s+async\s+function\s+\w+\s*\(\s*\{\s*params\s*\}\s*\)/.test(
        code
      )
    ) {
      return {
        success: false,
        message:
          "Le composant doit être une fonction async qui accepte `params` en props.",
      };
    }

    // Vérifie que await params est utilisé pour extraire id
    if (!/const\s*\{\s*id\s*\}\s*=\s*await\s*params/.test(code)) {
      return {
        success: false,
        message:
          "Il faut faire `const { id } = await params;` pour récupérer l'id.",
      };
    }

    // Vérifie que id est utilisé dans le JSX
    if (!/id/.test(code)) {
      return {
        success: false,
        message:
          "`id` doit être utilisé dans le JSX pour afficher l'identifiant.",
      };
    }

    return { success: true };
  },
};
