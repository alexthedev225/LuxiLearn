# Introduction aux Server Components dans Next.js 15

Les **Server Components**, introduits avec React 18 et optimisés dans React 19, sont une fonctionnalité clé de Next.js 15, utilisé avec l'**App Router**. Ils permettent de rendre des composants côté serveur, réduisant le JavaScript envoyé au client, améliorant les performances, et facilitant la récupération de données directement dans le composant. Contrairement aux Client Components, qui s'exécutent dans le navigateur pour l'interactivité, les Server Components sont idéaux pour le rendu initial, le SEO, et l'accès sécurisé aux données sensibles (ex. : bases de données, clés API). Ce cours explore les concepts fondamentaux des Server Components, leur intégration avec les Client Components, et leur utilisation pour la récupération de données, avec des exemples pratiques en TypeScript. Conçu pour les débutants avec des bases en React, il fournit une base solide pour créer des applications web modernes avec Next.js.

## Objectifs

- Comprendre ce que sont les Server Components et leur rôle dans Next.js 15.
- Apprendre à créer et utiliser des Server Components avec l'App Router.
- Maîtriser la récupération de données dans les Server Components.
- Intégrer les Server Components avec les Client Components pour l'interactivité.
- Appliquer les bonnes pratiques pour optimiser les performances et la maintenabilité.
- Découvrir les ressources pour approfondir les Server Components.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) : variables, fonctions, async/await.
  - Bases de React : composants, JSX, props.
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Notions de base sur HTTP (\`fetch\`) et le rendu web.
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
   - \`app/\` : Contient les routes, pages, et layouts (Server Components par défaut).
   - \`components/\` : Dossier pour les Client Components ou composants réutilisables.
   - \`lib/\` : (Optionnel) Dossier pour les utilitaires (ex. : fonctions de récupération de données).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Qu'est-ce qu'un Server Component ?

- **Définition** : Un composant React qui s'exécute uniquement côté serveur, générant du HTML envoyé au client.
- **Avantages** :
  - Réduit le JavaScript envoyé au client, accélérant le chargement.
  - Améliore le SEO grâce au rendu côté serveur.
  - Permet un accès direct aux ressources serveur (ex. : bases de données, fichiers).
- **Limites** :
  - Pas d'interactivité (ex. : pas de \`useState\`, \`useEffect\`, ou gestionnaires d'événements).
  - Props passées aux Client Components doivent être sérialisables (JSON).

### 2. Server Components vs Client Components

- **Server Components** :
  - Par défaut dans l'App Router.
  - Supportent les fonctions asynchrones (\`async/await\`) pour la récupération de données.
  - Exemple : Récupérer des données via \`fetch\` ou Prisma.
- **Client Components** :
  - Marqués par \`"use client"\`, s'exécutent dans le navigateur.
  - Utilisés pour l'interactivité (ex. : formulaires, compteurs).
  - Reçoivent des données des Server Components via props.

### 3. Récupération de données

- Les Server Components peuvent utiliser \`fetch\` ou des ORMs (ex. : Prisma) pour accéder aux données côté serveur.
- Options de cache :
  - \`cache: 'no-store'\` : Rendu dynamique (SSR).
  - \`cache: 'force-cache'\` : Génération statique (SSG).
  - \`next: { revalidate: N }\` : Régénération statique incrémentale (ISR).

### 4. Intégration avec l'App Router

- Les Server Components sont utilisés dans les fichiers de l'App Router (\`app/page.tsx\`, \`app/layout.tsx\`).
- Supportent les routes dynamiques via \`await params\` pour accéder aux paramètres d'URL.
- Compatibles avec les fichiers spéciaux (\`error.tsx\`, \`not-found.tsx\`).

### 5. Nouveautés dans Next.js 15

- **React 19** : Améliore les rendus asynchrones et la gestion des Server Components.
- **Cache optimisé** : Options comme \`dynamicParams\` pour les routes dynamiques.
- **Turbopack** : Accélère le développement avec un compilateur plus rapide.

> **Note** : Les Server Components sont le choix par défaut pour les pages et layouts dans l'App Router, mais l'interactivité nécessite des Client Components.

## Exemple de code

### 1. Server Component de base (\`app/page.tsx\`)

Crée une page d'accueil simple avec un Server Component :

\`\`\`tsx
// app/page.tsx
export default function HomePage() {
return (

<main className="p-6">
<h1 className="text-3xl font-bold">Bienvenue sur Next.js 15</h1>
<p className="mt-4 text-gray-700">
Ceci est un Server Component, rendu côté serveur.
</p>
</main>
);
}
\`\`\`

- **Explication** : Ce Server Component définit la page d'accueil (\`/`). Il est rendu côté serveur, générant du HTML sans JavaScript client. Accessible via \`http://localhost:3000\`.

### 2. Récupération de données avec Server Component (\`app/posts/page.tsx\`)

Récupère une liste de posts depuis une API :

\`\`\`tsx
// app/posts/page.tsx
export default async function PostsPage() {
try {
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
cache: 'no-store', // Forcer SSR
});
const posts: { id: number; title: string; body: string }[] = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        <ul className="mt-4 space-y-2">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="text-gray-700">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </main>
    );

} catch (error) {
return (

<main className="p-6">
<h1 className="text-3xl font-bold text-red-600">Erreur</h1>
<p className="mt-4 text-gray-700">Impossible de charger les articles.</p>
</main>
);
}
}
\`\`\`

- **Explication** : Utilise \`fetch\` avec \`cache: 'no-store'\` pour un rendu SSR. Les erreurs sont gérées avec try/catch. Accessible via \`http://localhost:3000/posts\`.

### 3. Intégration avec Client Component (\`components/Counter.tsx\` et \`app/dashboard/page.tsx\`)

Combine un Server Component avec un Client Component :

\`\`\`tsx
// components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
const [count, setCount] = useState(0);

return (

<div className="p-4 border rounded">
<p className="text-gray-700">Compteur : {count}</p>
<button
onClick={() => setCount(count + 1)}
className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" >
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
try {
const response = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'force-cache', // SSG
next: { revalidate: 3600 }, // ISR toutes les heures
});
const users: { id: number; name: string }[] = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <ul className="mt-4 space-y-2">
          {users.slice(0, 5).map((user) => (
            <li key={user.id} className="text-gray-700">{user.name}</li>
          ))}
        </ul>
        <Counter />
      </main>
    );

} catch (error) {
return (

<main className="p-6">
<h1 className="text-3xl font-bold text-red-600">Erreur</h1>
<p className="mt-4 text-gray-700">Impossible de charger les données.</p>
</main>
);
}
}
\`\`\`

- **Explication** : Le Server Component récupère des données avec ISR (\`revalidate: 3600\`) et passe le rendu initial au Client Component (\`Counter.tsx\`) pour l'interactivité. Accessible via \`http://localhost:3000/dashboard\`.

### 4. Route dynamique avec Server Component (\`app/users/[id]/page.tsx\`)

Gère une route dynamique avec récupération de données :

\`\`\`tsx
// app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params; // Déstructuration de la Promise

try {
const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, {
cache: 'no-store', // SSR
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

- **Explication** : Utilise \`await params\` pour accéder aux paramètres dynamiques. Récupère les données en SSR et gère les erreurs. Accessible via \`http://localhost:3000/users/1\`.

## Bonnes pratiques

- **Préférer les Server Components par défaut** :

  - Utilisez les Server Components pour le rendu initial et la récupération de données.
  - Exemple : Placez la logique de récupération dans \`app/page.tsx\` plutôt que dans un Client Component.

- **Utiliser TypeScript** :

  - Définissez des interfaces pour les données et props :
    \`\`\`tsx
    interface User { id: number; name: string; email: string }
    \`\`\`
  - Validez les données avec des bibliothèques comme \`zod\` :
    \`\`\`tsx
    import { z } from 'zod';
    const userSchema = z.object({ id: z.number(), name: z.string(), email: z.string() });
    \`\`\`

- **Gérer les erreurs** :

  - Implémentez try/catch pour les appels réseau ou base de données.
  - Utilisez des fichiers spéciaux (\`error.tsx\`, \`not-found.tsx\`) pour des interfaces d'erreur conviviales.

- **Optimiser le cache** :

  - Choisissez entre SSR (\`no-store\`), SSG (\`force-cache\`), ou ISR (\`revalidate\`) selon les besoins.
  - Exemple :
    \`\`\`tsx
    await fetch('https://api.example.com/data', { next: { revalidate: 3600 } });
    \`\`\`

- **Protéger les secrets** :

  - Stockez les clés API et URL de base de données dans \`.env\` (ex. : \`API_KEY=xxx\`) et accédez-y uniquement dans les Server Components.

- **Minimiser les Client Components** :

  - Passez aux Client Components (\`"use client"\`) uniquement pour l'interactivité.
  - Assurez-vous que les props passées sont sérialisables.

- **Organiser le code** :

  - Placez les utilitaires (ex. : Prisma client) dans \`lib/\`.
  - Séparez les Server Components (\`app/\`) et Client Components (\`components/\`).

- **Tester les performances** :
  - Utilisez Lighthouse pour évaluer le SEO et le temps de chargement.
  - Surveillez les journaux serveur pour déboguer les erreurs.

## Ressources utiles

- [Documentation officielle Next.js : Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) : Guide complet sur les Server Components.
- [React 19 Documentation](https://react.dev) : Détails sur les Server Components et React 19.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et React 19.
- [Vercel Platform](https://vercel.com) : Déploiement simplifié pour les applications Next.js.
- [Article sur Server Components](https://vercel.com/blog/understanding-react-server-components) : Explications approfondies sur les Server Components.
- [Next.js Learn : Server Components](https://nextjs.org/learn) : Tutoriel interactif pour débutants.

## Prochaines étapes

- **Récupération de données avancée** : Explorez l'intégration avec Prisma ou Drizzle pour connecter des bases de données.
- **Server Actions** : Apprenez à utiliser \`"use server"\` pour des mutations côté serveur.
- **Génération statique (SSG)** : Utilisez \`generateStaticParams\` pour pré-rendre des routes dynamiques.
- **Optimisation des performances** : Testez avec Lighthouse et configurez le cache pour SSG/ISR.
- **Turbopack** : Expérimentez avec \`npm run dev --turbo\` pour un développement plus rapide.
- **Déploiement** : Publiez votre application sur Vercel pour tirer parti des optimisations des Server Components.

> **Note** : Les Server Components sont une innovation majeure de React et Next.js. Restez à jour avec la documentation officielle pour découvrir les nouvelles fonctionnalités de React 19 et Next.js 15.
