# Routage avec l'App Router dans Next.js 15

Le routage est un pilier fondamental de toute application web, permettant aux utilisateurs de naviguer entre différentes pages ou vues. Dans Next.js 15, l'**App Router**, introduit dans la version 13, remplace le système basé sur le dossier \`pages/\` par une approche plus flexible et puissante, centrée sur le dossier \`app/\`. Ce système utilise la structure des fichiers et dossiers pour définir les routes, tout en exploitant les **Server Components** de React pour optimiser les performances et le SEO. Ce cours explore en détail le fonctionnement du routage avec l'App Router, incluant les routes statiques, dynamiques, les layouts, les groupes de routes, et les pages spéciales, avec des exemples pratiques et des bonnes pratiques.

## Objectifs

- Comprendre le fonctionnement du routage dans l'App Router de Next.js 15.
- Créer des routes statiques et dynamiques avec des paramètres.
- Utiliser des layouts et des groupes de routes pour organiser l'application.
- Gérer les pages spéciales (erreur, chargement, 404).
- Appliquer les bonnes pratiques pour un routage performant et maintenable.
- Découvrir les outils et configurations avancées, comme Turbopack et le caching.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et bases de React (composants, JSX, hooks).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Notions de base sur Next.js et les Server Components.
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

   - Choisissez TypeScript (recommandé) et l'App Router (par défaut).
   - Acceptez les configurations par défaut pour Tailwind CSS si souhaité.

2. **Démarrer le projet** :
   Accédez au dossier et lancez le serveur de développement :

   \`\`\`bash
   cd my-next-app
   npm run dev
   \`\`\`

3. **Vérifier l’application** :
   Ouvre \`http://localhost:3000\` dans ton navigateur pour voir la page d'accueil par défaut.

4. **Structure du projet** :
   - \`app/\` : Contient les routes, pages, layouts, et fichiers spéciaux.
   - \`public/\` : Fichiers statiques (images, favicon, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Testez Turbopack (bêta dans Next.js 15) avec \`npm run dev --turbo\` pour un démarrage plus rapide du serveur.

## Fonctionnalités clés / Concepts importants

### 1. Routage basé sur les fichiers

- L'App Router utilise la structure du dossier \`app/\` pour définir les routes.
- Chaque fichier \`page.tsx\` dans un dossier représente une route.
- Exemple : \`app/about/page.tsx\` crée la route \`/about\`.

### 2. Routes dynamiques

- Les dossiers avec crochets (ex. : \`[id]\`) définissent des routes dynamiques.
- Les paramètres sont accessibles via une \`Promise\` dans l'objet \`params\`.
- Exemple : \`app/blog/[slug]/page.tsx\` correspond à \`/blog/:slug\`.

### 3. Layouts

- Un fichier \`layout.tsx\` définit une mise en page commune pour un dossier et ses sous-routes.
- Les layouts peuvent être imbriqués pour une hiérarchie complexe.
- Les layouts sont des Server Components par défaut, mais peuvent être des Client Components avec \`"use client"\`.

### 4. Groupes de routes

- Les dossiers entre parenthèses (ex. : \`(auth)\`) regroupent des routes sans affecter l'URL.
- Utiles pour organiser les routes (ex. : routes d'authentification séparées).

### 5. Pages spéciales

- **Page de chargement** (\`loading.tsx\`) : Affiche un état de chargement pendant le rendu SSR.
- **Page d'erreur** (\`error.tsx\`) : Gère les erreurs dans un segment de route.
- **Page 404** (\`not-found.tsx\`) : Personnalise la page pour les routes inexistantes.

### 6. Nouveautés de Next.js 15

- Support de React 19 pour des rendus asynchrones optimisés.
- Améliorations du cache avec des options comme \`dynamicParams\` pour les routes dynamiques.
- Intégration de Turbopack pour accélérer le développement.

> **Note** : Les Server Components réduisent le JavaScript envoyé au client, mais les routes nécessitant de l'interactivité (ex. : formulaires) doivent utiliser \`"use client"\`.

## Exemple de code

### 1. Route statique (\`app/about/page.tsx\`)

Crée une page statique pour la route \`/about\` :

\`\`\`tsx
// app/about/page.tsx
export default function AboutPage() {
return (

<main className="p-6">
<h1 className="text-3xl font-bold">À propos</h1>
<p className="mt-4 text-gray-700">
Bienvenue sur notre application Next.js 15 !
</p>
</main>
);
}
\`\`\`

- **Explication** : Ce fichier définit la route \`/about\`. Le composant est un Server Component par défaut, rendu côté serveur.

### 2. Route dynamique (\`app/blog/[slug]/page.tsx\`)

Crée une page dynamique pour les articles de blog :

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
const { slug } = await params; // Déstructuration de la Promise

// Simulation d'une récupération de données
const post = {
slug,
title: \`Article : \${slug}\`,
content: \`Contenu de l'article pour \${slug}\`,
};

return (

<main className="p-6">
<h1 className="text-3xl font-bold">{post.title}</h1>
<p className="mt-4 text-gray-700">{post.content}</p>
</main>
);
}
\`\`\`

- **Explication** : Le dossier \`[slug]\` capture le paramètre dynamique. Accessible via \`http://localhost:3000/blog/mon-article\`. La Promise \`params\` est déstructurée avec \`await\`.

### 3. Layout imbriqué (\`app/layout.tsx\` et \`app/blog/layout.tsx\`)

Définir un layout global et un layout spécifique pour le dossier \`blog\` :

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (

<html lang="fr">
<body className="bg-gray-100">
<header className="bg-red-600 text-white p-4">
<h1 className="text-2xl font-bold">Mon App</h1>
</header>
<main>{children}</main>
</body>
</html>
);
}
\`\`\`

\`\`\`tsx
// app/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
return (

<div className="max-w-4xl mx-auto">
<h2 className="text-xl font-semibold mb-4">Section Blog</h2>
{children}
</div>
);
}
\`\`\`

- **Explication** : Le layout global (\`app/layout.tsx\`) s'applique à toutes les routes, tandis que \`app/blog/layout.tsx\` s'applique uniquement aux routes sous \`/blog\`. Les layouts sont imbriqués automatiquement.

### 4. Groupe de routes (\`app/(auth)/login/page.tsx\`)

Organiser les routes d'authentification sans affecter l'URL :

\`\`\`tsx
// app/(auth)/login/page.tsx
export default function LoginPage() {
return (

<main className="p-6">
<h1 className="text-3xl font-bold">Connexion</h1>
<p className="mt-4 text-gray-700">Formulaire de connexion ici.</p>
</main>
);
}
\`\`\`

- **Explication** : Le dossier \`(auth)\` regroupe les routes comme \`/login\` sans ajouter \`(auth)\` à l'URL. Accessible via \`http://localhost:3000/login\`.

### 5. Page de chargement (\`app/blog/loading.tsx\`)

Afficher un état de chargement pour les routes sous \`/blog\` :

\`\`\`tsx
// app/blog/loading.tsx
export default function Loading() {
return (

<div className="p-6">
<p className="text-gray-700">Chargement des articles...</p>
</div>
);
}
\`\`\`

- **Explication** : Ce composant s'affiche pendant le rendu SSR ou la récupération de données pour les routes sous \`/blog\`.

### 6. Page d'erreur (\`app/blog/error.tsx\`)

Gérer les erreurs dans le segment \`blog\` :

\`\`\`tsx
// app/blog/error.tsx
'use client'; // Nécessaire pour les interactions côté client
import { useEffect } from 'react';

export default function Error({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => {
console.error(error);
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

- **Explication** : Ce composant, marqué \`"use client"\`, gère les erreurs dans le segment \`blog\`. La fonction \`reset\` permet de relancer le rendu.

## Bonnes pratiques

- **Utiliser des Server Components par défaut** : Minimisez le JavaScript côté client pour améliorer les performances.
- **Organiser avec des groupes de routes** : Utilisez \`(nom)\` pour regrouper les routes logiquement sans impacter l'URL.
- **Gérer les erreurs** : Implémentez des fichiers \`error.tsx\` et \`not-found.tsx\` pour une expérience utilisateur robuste.
- **Optimiser les layouts** : Évitez les layouts trop complexes pour ne pas ralentir le rendu.
- **Configurer le cache** : Utilisez \`cache: 'no-store'\` pour les routes dynamiques SSR, ou \`"force-cache"\` pour les données statiques.
- **Tester avec Turbopack** : Activez \`npm run dev --turbo\` pour accélérer le développement.

## Ressources utiles

- [Documentation officielle Next.js : App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15
- [Guide des routes dynamiques](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [React 19 Documentation](https://react.dev) pour comprendre les Server Components
- [Vercel Platform](https://vercel.com) pour déployer vos applications

## Prochaines étapes

- **Routes dynamiques avancées** : Explorez \`generateStaticParams\` pour combiner SSG et routes dynamiques.
- **Interception de routes** : Apprenez à intercepter des routes pour des modales ou des vues spécifiques.
- **API Routes** : Créez des endpoints backend dans \`app/api/\` pour gérer les données.
- **SEO et performances** : Testez vos routes avec Lighthouse pour optimiser le SEO et la vitesse.
- **React 19 et Turbopack** : Expérimentez les nouvelles fonctionnalités de React 19 et le mode développement rapide de Turbopack.

> **Note** : Consultez régulièrement la documentation officielle pour rester à jour avec les évolutions de l'App Router et de Next.js.
