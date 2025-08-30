# Rendu côté serveur (SSR) avec Next.js 15 App Router

Next.js 15, avec son **App Router**, simplifie le rendu côté serveur (SSR) en utilisant les **Server Components** de React par défaut. Introduit dans Next.js 13 et optimisé dans la version 15, l'App Router remplace le système basé sur le dossier \`pages/\` par une architecture plus flexible et performante, située dans le dossier \`app/\`. Le SSR permet de générer le HTML sur le serveur à chaque requête, améliorant le SEO et la performance initiale des pages.

## Objectifs

- Comprendre le fonctionnement du rendu côté serveur (SSR) dans Next.js 15.
- Apprendre à créer des pages SSR avec l'App Router.
- Découvrir comment récupérer des données côté serveur de manière asynchrone.
- Identifier quand utiliser les Server Components par rapport aux Client Components.
- Appliquer les bonnes pratiques pour optimiser les performances et la gestion des données.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et notions de base en React (composants, JSX).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de base de l'App Router et des Server Components.
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir section Installation).
  - Un éditeur de code comme VS Code et un terminal.

## Installation

1. **Créer un projet Next.js 15** :
   Exécutez la commande suivante pour initialiser un projet avec l'App Router :

   \`\`\`bash
   npx create-next-app@latest my-next-app
   \`\`\`

   - Choisissez les options par défaut ou activez TypeScript.
   - Assurez-vous que l'App Router est sélectionné (option par défaut).

2. **Démarrer le projet** :
   Accédez au dossier et lancez le serveur de développement :

   \`\`\`bash
   cd my-next-app
   npm run dev
   \`\`\`

3. **Vérifier l’application** :
   Ouvre \`http://localhost:3000\` dans ton navigateur pour voir la page par défaut.

4. **Structure du projet** :
   - \`app/\` : Contient les routes, pages, et layouts pour l'App Router.
   - \`public/\` : Fichiers statiques (images, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Pour utiliser Turbopack (bêta dans Next.js 15), lancez \`npm run dev --turbo\` pour un démarrage plus rapide.

## Fonctionnalités clés / Concepts importants

- **Server Components par défaut** :

  - Dans l'App Router, tous les composants dans \`app/\` sont des **Server Components** sauf si marqués avec \`"use client"\`.
  - Ils s'exécutent uniquement sur le serveur, réduisant le JavaScript envoyé au client.
  - Supportent les fonctions asynchrones pour récupérer des données directement.

- **Rendu côté serveur (SSR)** :

  - Le HTML est généré à chaque requête, garantissant un contenu dynamique et à jour.
  - Idéal pour les pages nécessitant des données fraîches (ex. : tableaux de bord, profils utilisateur).
  - Améliore le SEO car le contenu est immédiatement disponible pour les moteurs de recherche.

- **Gestion des données** :

  - Les Server Components peuvent utiliser \`fetch\` avec des options de cache (\`"no-store"\` pour SSR, \`"force-cache"\` pour données statiques).
  - Les erreurs doivent être gérées avec des try/catch pour une expérience utilisateur robuste.

- **Différences avec Client Components** :

  - Les Client Components, marqués par \`"use client"\`, s'exécutent dans le navigateur et sont nécessaires pour les interactions dynamiques (ex. : gestion d'événements, useState).
  - Les Server Components sont plus performants pour le rendu initial, mais ne supportent pas l'interactivité côté client.

- **Nouveautés Next.js 15** :
  - Support de React 19 pour une meilleure gestion des rendus asynchrones.
  - Améliorations du cache avec des options comme \`dynamicParams\` pour les routes dynamiques.
  - Intégration de Turbopack pour accélérer le développement.

> **Note** : Le SSR est particulièrement adapté aux pages dynamiques, mais pour du contenu statique, envisagez la génération statique (SSG) ou l'ISR.

## Exemple de code

### 1. Page SSR simple (\`app/products/page.tsx\`)

Créez une page qui affiche une liste statique de produits en TypeScript :

\`\`\`tsx
export default async function ProductsPage() {
// Données statiques pour l'exemple
const products = [
{ id: 1, title: "Produit A", price: 29.99 },
{ id: 2, title: "Produit B", price: 49.99 },
];

return (
<main className="p-6">
<h1 className="text-3xl font-bold">Liste des produits</h1>
<ul className="mt-4 space-y-2">
{products.map((product) => (
<li key={product.id} className="text-gray-700">
{product.title} - {"$" + product.price}
</li>
))}
</ul>
</main>
);
}
\`\`\`

- Cette page est rendue côté serveur à chaque requête, garantissant un HTML complet.

### 2. Page SSR avec récupération de données (\`app/users/page.tsx\`)

Exemple avec une récupération de données asynchrone depuis une API :

\`\`\`tsx
export default async function UsersPage() {
try {
const response = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'no-store', // Forcer SSR sans cache
});
const users = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <ul className="mt-4 space-y-2">
          {users.map((user: { id: number; name: string }) => (
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
<h1 className="text-3xl font-bold">Erreur</h1>
<p>Impossible de charger les utilisateurs.</p>
</main>
);
}
}
\`\`\`

- **Explication** : La fonction utilise \`fetch\` avec \`cache: 'no-store'\` pour garantir un rendu SSR à chaque requête. Les erreurs sont gérées avec un bloc try/catch.

### 3. Route dynamique SSR (\`app/users/[id]/page.tsx\`)

Créez une page dynamique pour afficher les détails d’un utilisateur :

\`\`\`tsx
export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params; // Déstructuration de la Promise

try {
const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, {
cache: 'no-store',
});
const user = await response.json();

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Utilisateur : {user.name}</h1>
        <p>Email : {user.email}</p>
      </main>
    );

} catch (error) {
return (
<main className="p-6">
<h1 className="text-3xl font-bold">Erreur</h1>
<p>Impossible de charger l'utilisateur.</p>
</main>
);
}
}
\`\`\`

- **Explication** : Les paramètres dynamiques sont accessibles via \`await params\`. L’appel API est effectué côté serveur, et le rendu est dynamique.

### 4. API Route avec SSR (\`app/api/users/route.ts\`)

Créez un endpoint API pour renvoyer des données dynamiques :

\`\`\`tsx
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
try {
const response = await fetch('https://jsonplaceholder.typicode.com/users', {
cache: 'no-store',
});
const users = await response.json();
return NextResponse.json(users);
} catch (error) {
return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
}
}
\`\`\`

- **Explication** : L’API utilise \`NextRequest\` et renvoie des données dynamiques sans mise en cache, adaptées au SSR.

## Ressources utiles

- [Documentation officielle Next.js : Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15
- [Guide sur le rendu SSR](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-side-rendering-ssr)
- [React 19 Documentation](https://react.dev) pour comprendre les Server Components
- [Vercel Platform](https://vercel.com) pour déployer des applications SSR

## Prochaines étapes

- **Routes dynamiques avancées** : Explorez les layouts (\`layout.tsx\`) et les paramètres dynamiques avec \`generateStaticParams\` pour combiner SSR et SSG.
- **Gestion du cache** : Apprenez à ajuster les options de cache (\`"no-store"\`, \`"force-cache"\`) pour optimiser les performances.
- **Client Components** : Découvrez comment intégrer \`"use client"\` pour les interactions dynamiques.
- **Turbopack** : Testez le mode développement rapide avec \`npm run dev --turbo\`.
- **Déploiement** : Publiez votre application SSR sur Vercel pour des performances optimales.

> **Note** : Testez vos pages SSR avec des outils comme Lighthouse pour vérifier les performances et le SEO.
