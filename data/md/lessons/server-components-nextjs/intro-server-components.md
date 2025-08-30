# Introduction aux Server Components dans Next.js 15

Les **Server Components** sont une fonctionnalité clé de React, introduite avec React 18 et optimisée dans React 19, pleinement intégrée dans Next.js 15 via l'**App Router**. Contrairement aux composants React traditionnels qui s'exécutent côté client, les Server Components sont rendus exclusivement sur le serveur, réduisant le JavaScript envoyé au navigateur, améliorant les performances, et simplifiant la récupération de données. Dans l'App Router, tous les composants dans le dossier \`app/\` sont des Server Components par défaut, offrant un moyen puissant de construire des applications web modernes avec un meilleur SEO et une expérience utilisateur optimisée. Ce cours explore en détail le fonctionnement, les avantages, les limites, et les bonnes pratiques des Server Components dans Next.js 15.

## Objectifs

- Comprendre le concept des Server Components et leur rôle dans Next.js 15.
- Apprendre à créer et utiliser des Server Components dans l'App Router.
- Maîtriser la récupération de données asynchrone côté serveur.
- Identifier quand utiliser les Server Components par rapport aux Client Components.
- Appliquer les bonnes pratiques pour optimiser les performances et la maintenabilité.
- Découvrir les nouveautés de React 19 et leur impact sur les Server Components.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et bases de React (composants, JSX, hooks).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de base de l'App Router dans Next.js.
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir Installation).
  - Un éditeur de code (ex. : VS Code) et un terminal.

## Installation

1. **Créer un projet Next.js 15** :
   Exécutez la commande suivante pour initialiser un projet avec l'App Router :

   \`\`\`bash
   npx create-next-app@latest my-next-app
   \`\`\`

   - Sélectionnez TypeScript (recommandé) et l'App Router (par défaut).
   - Acceptez les configurations par défaut pour Tailwind CSS si souhaité.

2. **Démarrer le projet** :
   Accédez au dossier et lancez le serveur de développement :

   \`\`\`bash
   cd my-next-app
   npm run dev
   \`\`\`

3. **Vérifier l’application** :
   Ouvre \`http://localhost:3000\` dans ton navigateur pour voir la page par défaut.

4. **Structure du projet** :
   - \`app/\` : Contient les routes, pages, et layouts, où les Server Components sont définis par défaut.
   - \`public/\` : Fichiers statiques (images, favicon, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester Turbopack (bêta dans Next.js 15), qui accélère le démarrage du serveur.

## Fonctionnalités clés / Concepts importants

### 1. Qu'est-ce qu'un Server Component ?
- Les Server Components sont des composants React rendus exclusivement sur le serveur.
- Ils génèrent du HTML envoyé au client, réduisant le JavaScript exécuté dans le navigateur.
- Par défaut dans l'App Router (\`app/\`), sauf si marqués avec \`"use client"\`.
- Supportent les fonctions asynchrones pour récupérer des données directement (ex. : appels API, requêtes base de données).

### 2. Avantages des Server Components
- **Performance** : Moins de JavaScript envoyé au client, réduisant le temps de chargement.
- **SEO** : Le HTML complet est disponible dès le chargement initial, idéal pour les moteurs de recherche.
- **Récupération de données simplifiée** : Les appels à des APIs ou bases de données peuvent être effectués directement dans le composant.
- **Sécurité** : Les clés API et autres secrets restent côté serveur.

### 3. Limites des Server Components
- Pas d'interactivité côté client (ex. : pas de \`useState\`, \`useEffect\`, ou gestionnaires d'événements).
- Les bibliothèques nécessitant le DOM ou le navigateur ne sont pas compatibles.
- Nécessitent des Client Components (\`"use client"\`) pour les interactions dynamiques.

### 4. Intégration avec l'App Router
- Les fichiers comme \`page.tsx\` et \`layout.tsx\` dans \`app/\` sont des Server Components par défaut.
- Ils peuvent être combinés avec des Client Components pour des interfaces interactives.
- Supportent le rendu côté serveur (SSR), la génération statique (SSG), et l'ISR (Incremental Static Regeneration).

### 5. Récupération de données
- Les Server Components peuvent utiliser \`fetch\` avec des options de cache (\`"no-store"\` pour SSR, \`"force-cache"\` pour SSG).
- Les erreurs doivent être gérées avec try/catch pour une expérience robuste.

### 6. Nouveautés dans Next.js 15
- Support de **React 19** : Améliore les rendus asynchrones et la gestion des Server Components.
- **Turbopack** : Accélère le développement avec un compilateur plus rapide (en bêta).
- **Cache optimisé** : Nouvelles options comme \`dynamicParams\` pour les routes dynamiques et une meilleure gestion du cache.

> **Note** : Les Server Components sont idéaux pour les pages statiques ou dynamiques sans interactivité. Pour les formulaires ou les interactions, combinez-les avec des Client Components.

## Exemple de code

### 1. Server Component simple (\`app/page.tsx\`)
Crée une page d'accueil avec un Server Component :

\`\`\`tsx
// app/page.tsx
export default async function HomePage() {
  // Données statiques pour l'exemple
  const message = "Bienvenue sur Next.js 15 avec Server Components !";

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Accueil</h1>
      <p className="mt-4 text-gray-700">{message}</p>
    </main>
  );
}
\`\`\`

- **Explication** : Ce composant est rendu côté serveur et génère du HTML statique. Accessible via \`http://localhost:3000\`.

### 2. Server Component avec récupération de données (\`app/users/page.tsx\`)
Récupère une liste d'utilisateurs depuis une API :

\`\`\`tsx
// app/users/page.tsx
export default async function UsersPage() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store', // Forcer SSR
    });
    const users: { id: number; name: string }[] = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Liste des utilisateurs</h1>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="text-gray-700">
              {user.name}
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="mt-4 text-gray-700">Impossible de charger les utilisateurs.</p>
      </main>
    );
  }
}
\`\`\`

- **Explication** : Utilise \`fetch\` avec \`cache: 'no-store'\` pour un rendu SSR. Les erreurs sont gérées avec try/catch. Accessible via \`http://localhost:3000/users\`.

### 3. Server Component avec route dynamique (\`app/users/[id]/page.tsx\`)
Affiche les détails d'un utilisateur spécifique :

\`\`\`tsx
// app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Déstructuration de la Promise

  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, {
      cache: 'no-store',
    });
    const user: { id: number; name: string; email: string } = await response.json();

    if (!user) {
      return (
        <main className="p-6">
          <h1 className="text-3xl font-bold text-red-600">Utilisateur non trouvé</h1>
        </main>
      );
    }

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Utilisateur : {user.name}</h1>
        <p className="mt-4 text-gray-700">Email : {user.email}</p>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="mt-4 text-gray-700">Impossible de charger l'utilisateur.</p>
      </main>
    );
  }
}
\`\`\`

- **Explication** : Utilise une route dynamique avec \`await params\`. Accessible via \`http://localhost:3000/users/1\`. Gère les erreurs et les cas où l'utilisateur n'existe pas.

### 4. Combinaison avec Client Component (\`components/Counter.tsx\` et \`app/dashboard/page.tsx\`)
Intègre un Client Component dans un Server Component :

\`\`\`tsx
// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded">
      <p>Compteur : {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
      >
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

\`\`\`tsx
// app/dashboard/page.tsx
import Counter from '@/components/Counter';

export default async function DashboardPage() {
  // Données récupérées côté serveur
  const data = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <p className="mt-4 text-gray-700">Données : {data.summary}</p>
      <Counter />
    </main>
  );
}
\`\`\`

- **Explication** : Le Server Component (\`page.tsx\`) récupère des données, tandis que le Client Component (\`Counter.tsx\`) gère l'interactivité. Le marqueur \`"use client"\` est requis pour le composant interactif.

## Bonnes pratiques

- **Préférer les Server Components** : Utilisez-les par défaut pour réduire le JavaScript client et améliorer les performances.
- **Gérer les erreurs** : Implémentez des blocs try/catch pour les appels réseau et affichez des messages d'erreur conviviaux.
- **Optimiser le cache** : Utilisez \`cache: 'no-store'\` pour les données dynamiques (SSR) et \`"force-cache"\` pour les données statiques (SSG).
- **Séparer Server et Client Components** : Placez les interactions dynamiques (ex. : formulaires) dans des Client Components marqués \`"use client"\`.
- **Utiliser TypeScript** : Ajoutez des types pour les props et les données pour une meilleure maintenabilité. Exemple :
  \`\`\`tsx
  interface User { id: number; name: string; email: string }
  \`\`\`
- **Minimiser les dépendances** : Évitez les bibliothèques incompatibles avec le serveur (ex. : celles utilisant \`window\`) dans les Server Components.
- **Tester les performances** : Utilisez Lighthouse pour évaluer le SEO et la vitesse des pages rendues.

## Ressources utiles

- [Documentation officielle Next.js : Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15
- [React 19 Documentation](https://react.dev) pour les Server Components et les nouveautés
- [Guide sur le rendu dans Next.js](https://nextjs.org/docs/app/building-your-application/rendering)
- [Vercel Platform](https://vercel.com) pour déployer vos applications
- [Article sur Server vs Client Components](https://vercel.com/blog/understanding-react-server-components) pour approfondir

## Prochaines étapes

- **Rendu côté serveur (SSR)** : Explorez comment les Server Components s'intègrent avec le SSR pour des données dynamiques.
- **Génération statique (SSG)** : Apprenez à utiliser \`generateStaticParams\` pour pré-rendre des routes dynamiques.
- **Server Actions** : Découvrez les Server Actions (\`"use server"\`) pour des mutations côté serveur sans API publique.
- **Layouts et routage** : Implémentez des layouts (\`layout.tsx\`) et des routes dynamiques avec les Server Components.
- **Turbopack** : Testez \`npm run dev --turbo\` pour accélérer le développement.
- **Déploiement** : Publiez votre application sur Vercel pour optimiser les performances des Server Components.

> **Note** : Les Server Components sont une évolution majeure de React. Consultez régulièrement la documentation de React et Next.js pour rester à jour avec les nouvelles fonctionnalités.
