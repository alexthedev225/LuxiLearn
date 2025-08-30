# Récupérer des données dans les Server Components avec Next.js 15

Les **Server Components** dans Next.js 15, utilisés avec l'**App Router**, révolutionnent la récupération de données en permettant des appels asynchrones directement dans les composants côté serveur. Introduits avec React 18 et optimisés dans React 19, les Server Components réduisent le JavaScript envoyé au client, améliorent les performances, et simplifient l'accès aux données depuis des APIs ou des bases de données sans dépendre de fonctions comme \`getServerSideProps\` ou \`getStaticProps\`. Ce cours explore en détail comment récupérer des données dans les Server Components, en couvrant les appels HTTP, les connexions aux bases de données, la gestion du cache, et le traitement des erreurs, avec des exemples pratiques et des bonnes pratiques pour des applications performantes et sécurisées.

## Objectifs

- Comprendre comment récupérer des données dans les Server Components avec Next.js 15.
- Maîtriser les appels API asynchrones avec \`fetch\` et la gestion du cache.
- Connecter une base de données (ex. : Prisma) dans un Server Component.
- Gérer les erreurs et les cas de données manquantes.
- Appliquer les bonnes pratiques pour optimiser les performances et la sécurité.
- Explorer les différences avec les approches du Pages Router et les Client Components.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et bases de React (composants, JSX).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router et des Server Components.
  - Notions de base sur HTTP (\`fetch\`) et les bases de données relationnelles.
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir Installation).
  - (Optionnel) Une base de données (ex. : PostgreSQL) et un ORM comme Prisma.
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

3. **Configurer une base de données (optionnel)** :
   Pour les exemples avec base de données, installez Prisma :

   \`\`\`bash
   npm install prisma --save-dev
   npx prisma init
   \`\`\`

   - Configurez votre fichier \`.env\` avec une URL de base de données (ex. : PostgreSQL).
   - Exécutez \`npx prisma generate\` après avoir défini votre schéma.

4. **Structure du projet** :
   - \`app/\` : Contient les routes et pages où les Server Components récupèrent les données.
   - \`lib/\` : (Optionnel) Dossier pour les fonctions utilitaires (ex. : Prisma client).
   - \`prisma/\` : Contient le schéma Prisma et les migrations.

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester Turbopack (bêta dans Next.js 15) et accélérer le développement.

## Fonctionnalités clés / Concepts importants

### 1. Récupération de données dans les Server Components
- Les Server Components supportent les fonctions asynchrones, permettant des appels \`fetch\` ou des requêtes à une base de données directement dans le composant.
- Les données sont récupérées côté serveur, générant du HTML envoyé au client.
- Compatible avec SSR (rendu à chaque requête), SSG (rendu à la construction), et ISR (mise à jour périodique).

### 2. Utilisation de \`fetch\`
- Next.js 15 étend l'API Web \`fetch\` avec des options de cache :
  - \`cache: 'no-store'\` : Force le rendu dynamique (SSR).
  - \`cache: 'force-cache'\` : Cache les données pour SSG.
  - \`next: { revalidate: 3600 }\` : Active l'ISR avec un intervalle de revalidation (en secondes).
- Les appels \`fetch\` sont dédupliqués automatiquement pour éviter les requêtes redondantes.

### 3. Connexion aux bases de données
- Les Server Components peuvent utiliser des ORMs comme Prisma ou Drizzle pour interroger des bases de données.
- Les secrets (ex. : clés API, URL de base de données) restent sécurisés côté serveur.

### 4. Gestion des erreurs
- Les erreurs réseau ou base de données doivent être gérées avec try/catch.
- Les fichiers spéciaux (\`error.tsx\`, \`not-found.tsx\`) permettent d'afficher des interfaces conviviales pour les erreurs.

### 5. Routes dynamiques
- Les paramètres dynamiques sont accessibles via une \`Promise\` dans \`params\`.
- Utiles pour récupérer des données spécifiques (ex. : un utilisateur par ID).

### 6. Nouveautés dans Next.js 15
- **React 19** : Améliore les rendus asynchrones et la gestion des Server Components.
- **Cache optimisé** : Nouvelles options comme \`dynamicParams\` pour les routes dynamiques.
- **Turbopack** : Accélère le développement avec un compilateur plus rapide.

> **Note** : Les Server Components sont idéaux pour la récupération de données côté serveur, mais les interactions dynamiques nécessitent des Client Components avec \`"use client"\`.

## Exemple de code

### 1. Récupération de données avec \`fetch\` (\`app/posts/page.tsx\`)
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

### 2. Récupération avec cache pour SSG (\`app/news/page.tsx\`)
Récupère des nouvelles avec mise en cache :

\`\`\`tsx
// app/news/page.tsx
export default async function NewsPage() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'force-cache', // Cache pour SSG
      next: { revalidate: 3600 }, // Revalidation toutes les heures (ISR)
    });
    const news: { id: number; title: string }[] = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Nouvelles</h1>
        <ul className="mt-4 space-y-2">
          {news.slice(0, 5).map((item) => (
            <li key={item.id} className="text-gray-700">{item.title}</li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="mt-4 text-gray-700">Impossible de charger les nouvelles.</p>
      </main>
    );
  }
}
\`\`\`

- **Explication** : Utilise \`cache: 'force-cache'\` et \`revalidate: 3600\` pour générer la page statiquement avec une mise à jour toutes les heures (ISR).

### 3. Récupération avec base de données (Prisma) (\`app/users/page.tsx\`)
Récupère des utilisateurs depuis une base de données :

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
\`\`\`

- **Explication** : Utilise Prisma pour interroger une base de données. Le client Prisma est initialisé dans un fichier utilitaire. Nécessite un schéma Prisma (ex. : \`model User { id Int @id, name String, email String }\`).

### 4. Route dynamique avec données (\`app/users/[id]/page.tsx\`)
Récupère un utilisateur spécifique :

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

- **Explication** : Utilise une route dynamique avec \`await params\`. Accessible via \`http://localhost:3000/users/1\`. Gère les erreurs et les cas de données absentes.

## Bonnes pratiques

- **Utiliser TypeScript** : Ajoutez des types pour les données récupérées pour une meilleure maintenabilité. Exemple :
  \`\`\`tsx
  interface Post { id: number; title: string; body: string }
  \`\`\`
- **Gérer les erreurs** : Implémentez try/catch pour capturer les erreurs réseau ou base de données, et affichez des messages conviviaux.
- **Optimiser le cache** : Choisissez entre SSR (\`no-store\`), SSG (\`force-cache\`), ou ISR (\`revalidate\`) selon les besoins de fraîcheur des données.
- **Centraliser les accès aux données** : Placez les fonctions utilitaires (ex. : Prisma client) dans un dossier \`lib/\` pour la réutilisation.
- **Sécuriser les secrets** : Stockez les clés API et les URL de base de données dans \`.env\` et ne les exposez pas côté client.
- **Valider les données** : Utilisez des bibliothèques comme \`zod\` pour valider les réponses API :
  \`\`\`tsx
  import { z } from 'zod';
  const userSchema = z.object({ id: z.number(), name: z.string(), email: z.string() });
  \`\`\`
- **Tester les performances** : Utilisez Lighthouse pour évaluer le temps de chargement et le SEO des pages.

## Ressources utiles

- [Documentation officielle Next.js : Fetching Data](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15
- [React 19 Documentation](https://react.dev) pour les Server Components
- [Prisma Documentation](https://www.prisma.io/docs) pour l'intégration avec les bases de données
- [Vercel Platform](https://vercel.com) pour déployer vos applications
- [Article sur Data Fetching](https://vercel.com/blog/data-fetching-with-next-js) pour approfondir

## Prochaines étapes

- **Server Actions** : Explorez les Server Actions (\`"use server"\`) pour des mutations de données sans API publique.
- **Rendu statique (SSG)** : Apprenez à utiliser \`generateStaticParams\` pour pré-rendre des routes dynamiques.
- **Incremental Static Regeneration (ISR)** : Implémentez des mises à jour périodiques avec \`revalidate\`.
- **Client Components** : Intégrez des Client Components pour afficher les données dynamiquement.
- **Turbopack** : Testez \`npm run dev --turbo\` pour accélérer le développement.
- **Déploiement** : Publiez votre application sur Vercel pour optimiser les performances des Server Components.

> **Note** : Testez vos Server Components avec des outils comme Lighthouse et surveillez les journaux serveur pour optimiser les performances et déboguer les erreurs.
