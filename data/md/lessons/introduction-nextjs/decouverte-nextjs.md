
# Découverte de Next.js : Construire des applications web modernes avec le framework React

**Next.js**, créé par Vercel, est un framework React open-source qui simplifie le développement d'applications web performantes, scalables, et optimisées pour le SEO. Sorti en version 15 en octobre 2024, Next.js combine le rendu côté serveur (SSR), la génération statique (SSG), et la régénération statique incrémentale (ISR) pour offrir une expérience utilisateur rapide et un développement simplifié. Avec l'**App Router** et les **Server Components** de React 19, Next.js réduit le JavaScript envoyé au client, améliore les performances, et facilite la création d'applications full-stack. Ce cours d'introduction explore les concepts fondamentaux de Next.js, de l'installation à la création d'une application simple, en passant par le routage, le rendu, et la récupération de données. Conçu pour les débutants avec des bases en JavaScript et React, il fournit des exemples pratiques en TypeScript, des explications claires, et des bonnes pratiques pour démarrer efficacement.

## Objectifs

- Comprendre ce qu'est Next.js et son rôle dans le développement web moderne.
- Apprendre à configurer un projet Next.js 15 avec l'App Router.
- Maîtriser les bases du routage, du rendu, et de la récupération de données.
- Découvrir les Server Components et leur intégration avec les Client Components.
- Appliquer les bonnes pratiques pour créer des applications performantes et maintenables.
- Explorer les ressources pour approfondir ses connaissances en Next.js.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) : variables, fonctions, async/await, destructuring.
  - Bases de React : composants, JSX, props, (optionnel) hooks comme \`useState\`.
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Notions de HTML et CSS pour le rendu des interfaces.
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un éditeur de code (ex. : VS Code) et un terminal.
  - (Optionnel) Un compte Vercel pour le déploiement.

## Installation

1. **Créer un projet Next.js 15** :
   Exécutez la commande suivante pour initialiser un projet avec l'App Router :

   \`\`\`bash
   npx create-next-app@latest my-next-app
   \`\`\`

   - Répondez aux invites :
     - **TypeScript** : Oui (recommandé pour une meilleure maintenabilité).
     - **ESLint** : Oui (pour la vérification du code).
     - **Tailwind CSS** : Oui (pour un style rapide, optionnel).
     - **App Router** : Oui (système de routage moderne).
     - **src/ directory** : Non (structure par défaut).
     - **Import alias** : Non (peut être configuré ultérieurement).

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
   - \`components/\` : (Optionnel) Dossier pour les Client Components ou composants réutilisables.
   - \`public/\` : Ressources statiques (images, favicon, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, plugins).
   - \`.env.local\` : Variables d'environnement (ex. : clés API).

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Qu'est-ce que Next.js ?
- Next.js est un framework React qui ajoute des fonctionnalités comme le rendu côté serveur (SSR), la génération statique (SSG), et des optimisations intégrées (image, police, SEO).
- Développé par Vercel, il est utilisé par des entreprises comme Netflix, TikTok, et Shopify pour des applications performantes.
- Avantages :
  - **Performance** : Réduction du JavaScript client, code splitting automatique.
  - **SEO** : Rendu côté serveur pour un contenu indexable par les moteurs de recherche.
  - **Développement simplifié** : Routage basé sur les fichiers, API intégrées, et déploiement facile sur Vercel.

### 2. App Router
- Introduit dans Next.js 13 et standard dans Next.js 15, l'**App Router** utilise une structure de dossiers dans \`app/\` pour définir les routes.
- Exemple : Un fichier \`app/about/page.tsx\` crée une route accessible à \`/about\`.
- Supporte les layouts, les routes dynamiques, et les fichiers spéciaux (\`layout.tsx\`, \`error.tsx\`).

### 3. Server Components
- Par défaut dans l'App Router, les **Server Components** s'exécutent côté serveur, réduisant le JavaScript envoyé au client.
- Supportent les fonctions asynchrones pour la récupération de données (ex. : \`fetch\`, Prisma).
- Ne peuvent pas utiliser de hooks React (\`useState\`, \`useEffect\`) ou d'événements.

### 4. Client Components
- Marqués par la directive \`"use client"\`, ils s'exécutent dans le navigateur pour l'interactivité.
- Utilisés pour les formulaires, les compteurs, ou les interactions dynamiques.
- Peuvent recevoir des données des Server Components via props.

### 5. Rendu dans Next.js
- **Server-Side Rendering (SSR)** : Génère le HTML à chaque requête, idéal pour les données dynamiques.
- **Static Site Generation (SSG)** : Génère le HTML à la construction, parfait pour les contenus statiques.
- **Incremental Static Regeneration (ISR)** : Met à jour les pages statiques en arrière-plan après un intervalle.
- **Client-Side Rendering (CSR)** : Rendu dans le navigateur via Client Components.

### 6. Récupération de données
- Les Server Components peuvent utiliser \`fetch\` ou des ORMs comme Prisma pour récupérer des données côté serveur.
- Options de cache : \`no-store\` (SSR), \`force-cache\` (SSG), ou \`revalidate\` (ISR).

### 7. Nouveautés dans Next.js 15
- **React 19** : Support des Server Components améliorés et des rendus asynchrones.
- **Turbopack** : Compilateur plus rapide pour le développement (bêta).
- **Cache optimisé** : Options comme \`dynamicParams\` pour les routes dynamiques.
- **Optimisations intégrées** : Image (\`next/image\`), polices, et SEO.

> **Note** : Next.js 15 simplifie le développement full-stack en combinant rendu serveur, statique, et API intégrées, tout en restant compatible avec l'écosystème React.

## Exemple de code

### 1. Créer une page d'accueil avec Server Component (\`app/page.tsx\`)
Crée une page d'accueil simple avec un Server Component :

\`\`\`tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur Next.js 15</h1>
      <p className="mt-4 text-gray-700">
        Ceci est une application d'introduction à Next.js, utilisant l'App Router.
      </p>
    </main>
  );
}
\`\`\`

- **Explication** : Ce Server Component définit la page d'accueil (\`/`). Le fichier est automatiquement mappé à la route racine grâce à l'App Router. Accessible via \`http://localhost:3000\`.

### 2. Créer une page avec récupération de données (\`app/posts/page.tsx\`)
Récupère une liste de posts depuis une API avec SSR :

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

- **Explication** : Utilise un Server Component avec \`fetch\` pour récupérer des données en SSR (\`cache: 'no-store'\`). Gère les erreurs avec try/catch. Accessible via \`http://localhost:3000/posts\`.

### 3. Ajouter un Client Component pour l'interactivité (\`components/Counter.tsx\` et \`app/about/page.tsx\`)
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
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

\`\`\`tsx
// app/about/page.tsx
import Counter from '@/components/Counter';

export default function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">À propos</h1>
      <p className="mt-4 text-gray-700">
        Cette page démontre l'intégration d'un Client Component dans un Server Component.
      </p>
      <Counter />
    </main>
  );
}
\`\`\`

- **Explication** : Le Server Component (\`page.tsx\`) importe un Client Component (\`Counter.tsx\`) marqué par \`"use client"\`. Le Client Component gère l'interactivité avec \`useState\`. Accessible via \`http://localhost:3000/about\`.

### 4. Créer un layout global (\`app/layout.tsx\`)
Définit un layout partagé pour toutes les pages :

\`\`\`tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Découverte de Next.js',
  description: 'Une application d'introduction à Next.js 15',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Accueil</a></li>
            <li><a href="/posts" className="hover:underline">Articles</a></li>
            <li><a href="/about" className="hover:underline">À propos</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
\`\`\`

- **Explication** : Le layout global applique une police (via \`next/font\`) et une barre de navigation à toutes les pages. Les métadonnées (\`metadata\`) améliorent le SEO. Les enfants (\`children\`) représentent le contenu des pages.

## Bonnes pratiques

- **Utiliser l'App Router** :
  - Préférez l'App Router au Pages Router pour les nouvelles applications, car il supporte les Server Components et les layouts imbriqués.
  - Exemple : Créez des routes dans \`app/\` (ex. : \`app/blog/page.tsx\` pour \`/blog\`).

- **Adopter TypeScript** :
  - Utilisez TypeScript pour typer les données et props, réduisant les erreurs.
  - Exemple :
    \`\`\`tsx
    interface Post { id: number; title: string; body: string }
    \`\`\`

- **Optimiser le rendu** :
  - Utilisez SSR (\`cache: 'no-store'\`) pour les données dynamiques, SSG (\`force-cache\`) pour les contenus statiques, ou ISR (\`revalidate\`) pour les mises à jour périodiques.
  - Exemple :
    \`\`\`tsx
    await fetch('https://api.example.com/data', { next: { revalidate: 3600 } });
    \`\`\`

- **Minimiser les Client Components** :
  - Utilisez les Server Components par défaut et passez aux Client Components (\`"use client"\`) uniquement pour l'interactivité.
  - Exemple : Un formulaire interactif doit être un Client Component, mais son contenu initial peut être rendu par un Server Component.

- **Gérer les erreurs** :
  - Implémentez try/catch pour les appels réseau et des fichiers \`error.tsx\` pour des interfaces d'erreur conviviales.
  - Exemple :
    \`\`\`tsx
    try {
      const data = await fetch('https://api.example.com/data');
      return <div>{data}</div>;
    } catch (error) {
      return <div>Erreur : {error.message}</div>;
    }
    \`\`\`

- **Protéger les secrets** :
  - Stockez les clés API et les URL de base de données dans \`.env.local\` (ex. : \`API_KEY=xxx\`) et accédez-y uniquement dans les Server Components.

- **Tester les performances** :
  - Utilisez Lighthouse (dans Chrome DevTools) pour évaluer le SEO, la performance, et l'accessibilité.
  - Vérifiez les Core Web Vitals (LCP, FID, CLS) pour une expérience utilisateur optimale.

> **Source** : Ces bonnes pratiques sont inspirées des recommandations de la documentation officielle Next.js et d'articles sur les performances web en 2025.[](https://www.augustinfotech.com/blogs/nextjs-best-practices-in-2025/)

## Ressources utiles

- [Documentation officielle Next.js](https://nextjs.org/docs) : Guide complet sur l'App Router, les Server Components, et la récupération de données.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et React 19.
- [React 19 Documentation](https://react.dev) : Détails sur les Server Components et les nouveautés de React.
- [Vercel Platform](https://vercel.com) : Déploiement simplifié pour les applications Next.js.
- [Next.js Foundations Course](https://nextjs.org/learn) : Tutoriel interactif gratuit pour débutants.[](https://nextjs.org/docs)
- [freeCodeCamp Next.js Handbook](https://www.freecodecamp.org/news/the-next-js-handbook/) : Introduction pratique à Next.js.[](https://www.freecodecamp.org/news/the-next-js-handbook/)
- [Next.js by Vercel](https://nextjs.org) : Page officielle avec exemples et cours.[](https://nextjs.org/)

## Prochaines étapes

- **Approfondir le routage** : Explorez les routes dynamiques (\`app/blog/[id]/page.tsx\`) et les layouts imbriqués.
- **Récupération de données avancée** : Intégrez Prisma ou Drizzle pour connecter une base de données.
- **Server Actions** : Apprenez à utiliser \`"use server"\` pour des mutations côté serveur.
- **Optimisation des images** : Utilisez le composant \`next/image\` pour des images optimisées.
- **Déploiement** : Publiez votre application sur Vercel pour tester en production.
- **Turbopack** : Expérimentez avec \`npm run dev --turbo\` pour un développement plus rapide.
- **SEO et accessibilité** : Implémentez des métadonnées dynamiques (\`generateMetadata\`) et testez l'accessibilité avec des outils comme axe.

> **Note** : Next.js évolue rapidement. Consultez régulièrement la documentation officielle et le blog Next.js pour rester à jour sur les nouvelles fonctionnalités et les meilleures pratiques.

> **Source** : Les prochaines étapes sont basées sur les recommandations des cours officiels Next.js et des tutoriels pour 2025.[](https://nextjs.org/docs)[](https://www.augustinfotech.com/blogs/nextjs-best-practices-in-2025/)
