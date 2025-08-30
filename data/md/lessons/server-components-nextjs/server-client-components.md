# Combiner Server et Client Components dans Next.js 15

Dans Next.js 15, l'**App Router** utilise les **Server Components** comme approche par défaut pour le rendu côté serveur, offrant des performances optimisées et un SEO amélioré. Cependant, certaines fonctionnalités interactives, comme les formulaires ou les compteurs, nécessitent des **Client Components**, marqués par la directive \`"use client"\`, qui s'exécutent dans le navigateur. Combiner ces deux types de composants permet de tirer parti des avantages des deux : la légèreté et la sécurité des Server Components pour le rendu initial, et la richesse interactive des Client Components pour l'expérience utilisateur. Ce cours explore en détail comment intégrer Server et Client Components dans Next.js 15, avec des exemples pratiques, des explications sur les limites, et des bonnes pratiques pour des applications performantes et maintenables.

## Objectifs

- Comprendre les différences entre Server et Client Components dans Next.js 15.
- Apprendre à combiner Server et Client Components dans une application App Router.
- Maîtriser la récupération de données côté serveur tout en ajoutant de l'interactivité côté client.
- Gérer les limites et les interactions entre ces composants.
- Appliquer les bonnes pratiques pour optimiser les performances et la maintenabilité.
- Explorer les nouveautés de React 19 pour les Server et Client Components.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et bases de React (composants, JSX, hooks comme \`useState\` et \`useEffect\`).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router et des Server Components dans Next.js.
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
   - \`app/\` : Contient les routes, pages, et layouts avec des Server Components par défaut.
   - \`components/\` : Dossier pour les Client Components ou composants réutilisables.
   - \`lib/\` : (Optionnel) Dossier pour les utilitaires (ex. : fonctions de récupération de données).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester Turbopack (bêta dans Next.js 15) et accélérer le développement.

## Fonctionnalités clés / Concepts importants

### 1. Server Components vs Client Components

- **Server Components** :
  - Rendues côté serveur, génèrent du HTML statique ou dynamique.
  - Supportent les fonctions asynchrones pour récupérer des données (ex. : \`fetch\`, Prisma).
  - Réduisent le JavaScript envoyé au client, améliorant les performances et le SEO.
  - Ne supportent pas l'interactivité (ex. : pas de \`useState\`, \`useEffect\`, ou gestionnaires d'événements).
- **Client Components** :
  - Marqués par \`"use client"\`, s'exécutent dans le navigateur.
  - Utilisent des hooks React pour l'interactivité (ex. : formulaires, compteurs).
  - Nécessitent plus de JavaScript, ce qui peut augmenter le temps de chargement.

### 2. Combiner Server et Client Components

- Les Server Components peuvent importer des Client Components, mais l'inverse n'est pas possible directement.
- Les Server Components passent des données aux Client Components via des props.
- Les Client Components sont encapsulés dans des Server Components pour minimiser le JavaScript client.

### 3. Limites de l'intégration

- Les Server Components ne peuvent pas utiliser de hooks ou d'événements côté client.
- Les Client Components ne peuvent pas effectuer de récupération de données côté serveur directement.
- Les props passées aux Client Components doivent être sérialisables (pas de fonctions ou d'objets complexes non JSON).

### 4. Gestion des données

- Les Server Components récupèrent les données (ex. : via \`fetch\` ou Prisma) et les passent aux Client Components.
- Les options de cache (\`no-store\`, \`force-cache\`, \`revalidate\`) contrôlent le comportement du rendu (SSR, SSG, ISR).

### 5. Nouveautés dans Next.js 15

- **React 19** : Améliore les transitions entre Server et Client Components avec un meilleur support des rendus asynchrones.
- **Cache optimisé** : Nouvelles options comme \`dynamicParams\` pour les routes dynamiques.
- **Turbopack** : Accélère le développement pour les projets combinant Server et Client Components.

> **Note** : Une bonne combinaison de Server et Client Components équilibre performance (Server) et interactivité (Client).

## Exemple de code

### 1. Server Component avec Client Component (\`app/dashboard/page.tsx\`)

Combine un Server Component pour la récupération de données et un Client Component pour l'interactivité :

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
className="mt-2 bg-red-600 text-white px-4 py-2 rounded" >
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
// Récupération de données côté serveur
try {
const response = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'no-store', // Forcer SSR
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

- **Explication** : Le Server Component (\`page.tsx\`) récupère les données via \`fetch\` et les affiche, tandis que le Client Component (\`Counter.tsx\`) ajoute un compteur interactif. Accessible via \`http://localhost:3000/dashboard\`.

### 2. Route dynamique avec Client Component (\`app/users/[id]/page.tsx\`)

Passe des données dynamiques à un Client Component :

\`\`\`tsx
// components/UserProfile.tsx
'use client';

import { useState } from 'react';

interface UserProfileProps {
user: { id: number; name: string; email: string };
}

export default function UserProfile({ user }: UserProfileProps) {
const [isEmailVisible, setIsEmailVisible] = useState(false);

return (

<div className="p-4 border rounded">
<h2 className="text-xl font-semibold">{user.name}</h2>
<button
onClick={() => setIsEmailVisible(!isEmailVisible)}
className="mt-2 bg-red-600 text-white px-4 py-2 rounded" >
{isEmailVisible ? 'Masquer Email' : 'Afficher Email'}
</button>
{isEmailVisible && <p className="mt-2 text-gray-700">Email : {user.email}</p>}
</div>
);
}
\`\`\`

\`\`\`tsx
// app/users/[id]/page.tsx
import UserProfile from '@/components/UserProfile';

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
        <h1 className="text-3xl font-bold">Profil utilisateur</h1>
        <UserProfile user={user} />
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

- **Explication** : Le Server Component récupère les données dynamiques via \`await params\` et les passe au Client Component via props. Le Client Component gère l'interactivité (afficher/masquer l'email). Accessible via \`http://localhost:3000/users/1\`.

### 3. Layout avec Client Component (\`app/layout.tsx\`)

Inclut un Client Component dans un layout Server Component :

\`\`\`tsx
// components/NavBar.tsx
'use client';

import { useState } from 'react';

export default function NavBar() {
const [isOpen, setIsOpen] = useState(false);

return (

<nav className="bg-red-600 text-white p-4">
<button
onClick={() => setIsOpen(!isOpen)}
className="text-xl font-semibold" >
Menu
</button>
{isOpen && (
<ul className="mt-2 space-y-2">
<li><a href="/" className="hover:underline">Accueil</a></li>
<li><a href="/users" className="hover:underline">Utilisateurs</a></li>
</ul>
)}
</nav>
);
}
\`\`\`

\`\`\`tsx
// app/layout.tsx
import NavBar from '@/components/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (

<html lang="fr">
<body className="bg-gray-100">
<NavBar />
<main>{children}</main>
</body>
</html>
);
}
\`\`\`

- **Explication** : Le layout global (Server Component) inclut une barre de navigation interactive (Client Component). Le Client Component gère un menu déroulant.

### 4. Gestion des erreurs avec Client Component (\`app/error.tsx\`)

Utilise un Client Component pour une page d'erreur interactive :

\`\`\`tsx
// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => {
console.error(error); // Journalisation côté client
}, [error]);

return (

<div className="p-6">
<h1 className="text-3xl font-bold text-red-600">Erreur</h1>
<p className="mt-4 text-gray-700">Une erreur s'est produite : {error.message}</p>
<button
        onClick={reset}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
Réessayer
</button>
</div>
);
}
\`\`\`

- **Explication** : Ce Client Component, marqué \`"use client"\`, gère les erreurs dans un segment de route. La fonction \`reset\` permet de relancer le rendu.

## Bonnes pratiques

- **Minimiser les Client Components** : Utilisez les Server Components par défaut pour réduire le JavaScript envoyé au client.
- **Passer des props sérialisables** : Assurez-vous que les données passées des Server Components aux Client Components sont JSON-sérialisables (pas de fonctions ou d'objets complexes).
- **Organiser les composants** : Placez les Client Components dans un dossier \`components/\` et les Server Components dans \`app/\` pour plus de clarté.
- **Gérer les erreurs** : Implémentez des fichiers \`error.tsx\` (Client Component) pour capturer les erreurs des Server Components.
- **Optimiser le cache** : Utilisez \`cache: 'no-store'\` pour les données dynamiques dans les Server Components et passez les résultats aux Client Components.
- **Utiliser TypeScript** : Définissez des interfaces pour les props des Client Components :
  \`\`\`tsx
  interface UserProfileProps { user: { id: number; name: string; email: string } }
  \`\`\`
- **Tester les performances** : Utilisez Lighthouse pour évaluer le temps de chargement et minimiser l'impact des Client Components.

## Ressources utiles

- [Documentation officielle Next.js : Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Documentation officielle Next.js : Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15
- [React 19 Documentation](https://react.dev) pour les Server et Client Components
- [Vercel Platform](https://vercel.com) pour déployer vos applications
- [Article sur Server vs Client Components](https://vercel.com/blog/understanding-react-server-components) pour approfondir

## Prochaines étapes

- **Récupération de données avancée** : Explorez l'utilisation de Prisma ou Drizzle dans les Server Components pour les bases de données.
- **Server Actions** : Apprenez à utiliser \`"use server"\` pour des mutations côté serveur dans les Client Components.
- **Rendu statique (SSG)** : Combinez Server Components avec \`generateStaticParams\` pour pré-rendre des routes.
- **Turbopack** : Testez \`npm run dev --turbo\` pour accélérer le développement.
- **SEO et performances** : Utilisez Lighthouse pour optimiser le SEO et la vitesse des pages combinées.
- **Déploiement** : Publiez votre application sur Vercel pour tirer parti des optimisations des Server Components.

> **Note** : Une bonne architecture combine les Server Components pour le rendu initial et les Client Components pour l'interactivité, tout en surveillant les performances avec des outils comme Lighthouse.
