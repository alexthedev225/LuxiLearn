## Combiner Server et Client Components

Dans Next.js, vous pouvez combiner **Server Components** et **Client Components** pour tirer parti des avantages des deux. Les Server Components gèrent le rendu initial et les données, tandis que les Client Components ajoutent des interactions utilisateur.

### Server Components

- Rendus côté serveur.
- Idéal pour les données statiques ou dynamiques.
- Pas d’interactivité (pas de \`useState\`, \`useEffect\`, etc.).

### Client Components

- Marqués avec \`"use client"\`.
- Exécutés côté client.
- Utilisés pour les interactions (boutons, formulaires).

### Exemple : Combiner les deux

\`\`\`jsx
// app/page.jsx
import ClientButton from "../components/ClientButton";

export default async function Home() {
  const data = { message: "Bonjour depuis le serveur !" };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Accueil</h1>
      <p className="text-gray-300">{data.message}</p>
      <ClientButton />
    </div>
  );
}

// components/ClientButton.jsx
"use client";

import { useState } from "react";

export default function ClientButton() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p className="text-gray-300">Compte : {count}</p>
      <button
        className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg"
        onClick={() => setCount(count + 1)}
      >
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

### Comment ça marche ?

- Le Server Component (\`app/page.jsx\`) récupère les données et rend le HTML initial.
- Le Client Component (\`components/ClientButton.jsx\`) ajoute une interactivité avec \`useState\`.
- Le Server Component passe des données au Client Component via des props.

### Bonnes pratiques

- Utilisez les Server Components pour le rendu initial et les données.
- Limitez les Client Components aux parties interactives.
- Passez les données des Server Components aux Client Components via props.

### Exercice

Crée une page qui utilise un Server Component pour afficher un message statique et un Client Component pour un compteur.

### Ressources utiles

- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
  