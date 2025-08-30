# Génération statique (SSG) et ISR avec App Router dans Next.js 15

La **Génération statique (SSG)** et la **Régénération statique incrémentale (ISR)** sont des fonctionnalités puissantes de Next.js 15, utilisées avec l'**App Router** pour créer des applications web performantes. La SSG génère des pages HTML à la construction, offrant des temps de chargement rapides et un excellent SEO, idéal pour les contenus statiques comme les blogs ou les pages marketing. L'ISR permet de mettre à jour ces pages statiques en arrière-plan après un intervalle défini, combinant les avantages de la SSG avec la flexibilité des données dynamiques. Ce cours explore comment implémenter la SSG et l'ISR dans l'App Router, avec un focus sur l'utilisation de \`generateStaticParams\` pour les routes dynamiques, la gestion du cache, et l'intégration avec les Server Components. Conçu pour les débutants avec des bases en React, il fournit des exemples pratiques en TypeScript, des explications détaillées, et des bonnes pratiques pour optimiser les performances.

## Objectifs

- Comprendre les concepts de SSG et ISR dans Next.js 15.
- Apprendre à implémenter la SSG pour les pages statiques et dynamiques avec l'App Router.
- Maîtriser l'ISR pour mettre à jour les contenus statiques périodiquement.
- Utiliser \`generateStaticParams\` pour pré-rendre les routes dynamiques.
- Appliquer les bonnes pratiques pour optimiser les performances et la maintenabilité.
- Découvrir les ressources pour approfondir la SSG et l'ISR.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) : variables, fonctions, async/await.
  - Bases de React : composants, JSX, props.
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router et des Server Components (voir leçon "Introduction aux Server Components").
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
   - \`public/\` : Ressources statiques (images, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).
   - \`.env.local\` : Variables d'environnement pour les clés API.

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Génération statique (SSG)

- **Définition** : Génère le HTML des pages à la construction (\`npm run build\`), servi directement aux clients sans calcul à la requête.
- **Avantages** :
  - Temps de chargement rapides (HTML pré-rendu).
  - Excellent SEO grâce au contenu statique.
  - Réduction de la charge serveur.
- **Cas d'usage** : Blogs, pages marketing, documentation.
- **Implémentation** : Utilise \`fetch\` avec \`cache: 'force-cache'\` ou des ORMs comme Prisma.

### 2. Régénération statique incrémentale (ISR)

- **Définition** : Combine la SSG avec des mises à jour périodiques en arrière-plan après un intervalle défini (\`revalidate\`).
- **Avantages** :
  - Contenu statique avec mises à jour dynamiques sans rebuild complet.
  - Équilibre entre performance et fraîcheur des données.
- **Cas d'usage** : Pages de produits, actualités, tableaux de bord semi-dynamiques.
- **Implémentation** : Ajoute l'option \`next: { revalidate: N }\` à \`fetch\`.

### 3. generateStaticParams pour les routes dynamiques

- **Rôle** : Permet de pré-rendre les routes dynamiques (ex. : \`app/blog/[id]/page.tsx\`) en spécifiant les paramètres à la construction.
- **Utilisation** : Retourne un tableau d'objets définissant les valeurs possibles pour les paramètres d'URL.

### 4. Gestion du cache

- **Options de cache** :
  - \`cache: 'force-cache'\` : Force la SSG pour un rendu statique complet.
  - \`next: { revalidate: N }\` : Active l'ISR avec un intervalle de N secondes.
- **Comportement** : Le cache est géré par Next.js et Vercel pour optimiser les performances.

### 5. Nouveautés dans Next.js 15

- **React 19** : Support amélioré pour les rendus asynchrones dans les Server Components.
- **Cache optimisé** : Nouvelles options comme \`dynamicParams\` pour contrôler les routes dynamiques.
- **Turbopack** : Accélère la construction des sites statiques.

> **Note** : La SSG est idéale pour les contenus statiques, tandis que l'ISR convient aux données qui changent périodiquement, offrant un équilibre entre performance et dynamisme.

## Exemple de code

### 1. SSG pour une page statique (\`app/about/page.tsx\`)

Crée une page statique avec SSG :

\`\`\`tsx
// app/about/page.tsx
export default async function AboutPage() {
const data = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'force-cache', // SSG
});
const users: { id: number; name: string }[] = await data.json();

return (

<main className="p-6">
<h1 className="text-3xl font-bold">À propos</h1>
<p className="mt-4 text-gray-700">Page générée statiquement à la construction.</p>
<ul className="mt-4 space-y-2">
{users.slice(0, 5).map((user) => (
<li key={user.id} className="text-gray-700">{user.name}</li>
))}
</ul>
</main>
);
}
\`\`\`

- **Explication** : Utilise \`cache: 'force-cache'\` pour générer la page à la construction (SSG). Les données sont récupérées une seule fois lors du build. Accessible via \`http://localhost:3000/about\`.

### 2. ISR pour une page semi-dynamique (\`app/news/page.tsx\`)

Met à jour une page statique périodiquement avec ISR :

\`\`\`tsx
// app/news/page.tsx
export default async function NewsPage() {
try {
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
cache: 'force-cache', // SSG
next: { revalidate: 3600 }, // ISR toutes les heures
});
const posts: { id: number; title: string; body: string }[] = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Actualités</h1>
        <p className="mt-4 text-gray-700">Mises à jour toutes les heures avec ISR.</p>
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
<p className="mt-4 text-gray-700">Impossible de charger les actualités.</p>
</main>
);
}
}
\`\`\`

- **Explication** : Utilise ISR avec \`revalidate: 3600\` pour mettre à jour la page toutes les heures. Les erreurs sont gérées avec try/catch. Accessible via \`http://localhost:3000/news\`.

### 3. SSG avec route dynamique (\`app/blog/[id]/page.tsx\`)

Pré-rend une route dynamique avec `generateStaticParams` :

\`\`\`tsx
// app/blog/[id]/page.tsx
export async function generateStaticParams() {
const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
return posts.slice(0, 10).map((post: { id: number }) => ({
id: post.id.toString(),
}));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
try {
const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
cache: 'force-cache', // SSG
});
const post: { id: number; title: string; body: string } = await response.json();

    if (!post) {
      return (
        <main className="p-6">
          <h1 className="text-3xl font-bold text-red-600">Article non trouvé</h1>
        </main>
      );
    }

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4 text-gray-700">{post.body}</p>
      </main>
    );

} catch (error) {
return (

<main className="p-6">
<h1 className="text-3xl font-bold text-red-600">Erreur</h1>
<p className="mt-4 text-gray-700">Impossible de charger l'article.</p>
</main>
);
}
}
\`\`\`

- **Explication** : Utilise `generateStaticParams` pour pré-rendre 10 articles à la construction. La page est générée statiquement pour chaque `id`. Accessible via \`http://localhost:3000/blog/1\`.

### 4. ISR avec Prisma pour une base de données (\`app/users/page.tsx\`)

Utilise ISR avec une base de données :

\`\`\`tsx
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

// app/users/page.tsx
import prisma from '@/lib/prisma';

export default async function UsersPage() {
try {
const users = await prisma.user.findMany({
select: { id: true, name: true, email: true },
take: 5,
});

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <p className="mt-4 text-gray-700">Données statiques avec ISR (1 heure).</p>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="text-gray-700">
              {user.name} ({user.email})
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

export const revalidate = 3600; // ISR toutes les heures
\`\`\`

- **Explication** : Utilise Prisma pour récupérer des utilisateurs depuis une base de données, avec ISR configuré via `revalidate`. Nécessite un schéma Prisma (ex. : `model User { id Int @id, name String, email String }`).

## Bonnes pratiques

- **Choisir entre SSG et ISR** :

  - Utilisez SSG (\`cache: 'force-cache'\`) pour les contenus rarement mis à jour (ex. : pages marketing).
  - Utilisez ISR (\`revalidate\`) pour les contenus semi-dynamiques (ex. : actualités, produits).
  - Exemple :
    \`\`\`tsx
    await fetch('https://api.example.com/data', { next: { revalidate: 3600 } });
    \`\`\`

- **Utiliser generateStaticParams pour les routes dynamiques** :

  - Pré-rendez uniquement les routes nécessaires pour limiter le temps de construction.
  - Exemple :
    \`\`\`tsx
    export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }]; // Limiter les IDs
    }
    \`\`\`

- **Gérer les erreurs** :

  - Implémentez try/catch pour les appels réseau ou base de données.
  - Utilisez des fichiers spéciaux (\`error.tsx\`, \`not-found.tsx\`) pour les erreurs.

- **Utiliser TypeScript** :

  - Définissez des interfaces pour les données :
    \`\`\`tsx
    interface Post { id: number; title: string; body: string }
    \`\`\`
  - Validez les données avec des bibliothèques comme \`zod\` :
    \`\`\`tsx
    import { z } from 'zod';
    const postSchema = z.object({ id: z.number(), title: z.string(), body: z.string() });
    \`\`\`

- **Protéger les secrets** :

  - Stockez les clés API et URL de base de données dans \`.env.local\` (ex. : \`DATABASE_URL=xxx\`) et accédez-y dans les Server Components.

- **Tester les performances** :

  - Utilisez Lighthouse pour évaluer les Core Web Vitals (LCP, CLS, FID).
  - Vérifiez le temps de construction (\`npm run build\`) pour les projets SSG.

- **Optimiser le déploiement** :
  - Déployez sur Vercel pour tirer parti du cache automatique et de l'ISR.
  - Configurez \`next.config.mjs\` pour limiter les routes dynamiques :
    \`\`\`tsx
    /\*_ @type {import('next').NextConfig} _/
    const nextConfig = {
    generateStaticParams: {
    dynamicParams: false, // Désactiver les routes non pré-rendues
    },
    };
    export default nextConfig;
    \`\`\`

## Ressources utiles

- [Documentation officielle Next.js : Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) : Guide sur la SSG et l'ISR.
- [Documentation officielle Next.js : App Router](https://nextjs.org/docs/app/building-your-application/routing) : Détails sur l'App Router et `generateStaticParams`.
- [React 19 Documentation](https://react.dev) : Informations sur les Server Components.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et les optimisations.
- [Vercel Platform](https://vercel.com) : Déploiement optimisé pour SSG et ISR.
- [Next.js Learn : Static Rendering](https://nextjs.org/learn) : Tutoriel interactif sur la SSG et l'ISR.
- [Article sur SSG et ISR](https://vercel.com/guides/nextjs-incremental-static-regeneration) : Explications approfondies sur l'ISR.

## Prochaines étapes

- **Server Components avancés** : Explorez l'intégration des Server Components avec des bases de données comme Prisma.
- **Server Actions** : Apprenez à utiliser \`"use server"\` pour des mises à jour dynamiques dans les formulaires.
- **SEO et métadonnées** : Configurez des métadonnées dynamiques avec \`generateMetadata\` pour les pages SSG.
- **Optimisation des images** : Utilisez \`next/image\` pour améliorer les performances des pages statiques.
- **Déploiement** : Publiez votre application sur Vercel pour tester la SSG et l'ISR en production.
- **Turbopack** : Testez \`npm run build --turbo\` pour accélérer la construction des sites statiques.

> **Note** : La SSG et l'ISR sont des outils puissants pour optimiser les performances et le SEO. Testez régulièrement avec Lighthouse et consultez la documentation Next.js pour les dernières améliorations.
