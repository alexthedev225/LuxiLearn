## Introduction aux Server Components

Les **Server Components** sont une fonctionnalité clé de Next.js 13+ avec l’**App Router**. Ils permettent de rendre des composants côté serveur, réduisant le JavaScript envoyé au navigateur et améliorant les performances et le SEO.

### Qu'est-ce qu'un Server Component ?

Un Server Component est un composant React qui s’exécute uniquement sur le serveur. Contrairement aux composants traditionnels (rendus côté client), ils génèrent le HTML directement sur le serveur, ce qui est envoyé au navigateur.

### Avantages des Server Components

- **Moins de JavaScript** : Réduit la taille du bundle envoyé au client.
- **Meilleur SEO** : Le contenu est disponible immédiatement pour les moteurs de recherche.
- **Accès direct aux données** : Peut récupérer des données (API, base de données) sans JavaScript client.
- **Performance** : Chargement plus rapide des pages.

### Server Components dans l’App Router

Dans le dossier \`app/\`, tous les fichiers \`page.jsx\` sont des Server Components par défaut. Cela signifie que vous pouvez écrire des pages qui récupèrent des données et génèrent du HTML sans écrire de JavaScript côté client.

### Exemple simple

\`\`\`jsx
// app/page.jsx
export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur mon site</h1>
      <p className="text-gray-300">Ceci est un Server Component !</p>
    </div>
  );
}
\`\`\`

Ce composant est rendu côté serveur et envoie uniquement le HTML au navigateur.

### Prérequis

- Connaissances de base en JavaScript et React.
- Node.js 18+ installé.
- Un projet Next.js configuré avec l’App Router (voir le cours “Introduction à Next.js”).

### Créer un projet

1. Crée un projet Next.js :

   \`\`\`bash
   npx create-next-app@latest my-app
   \`\`\`

2. Lance le serveur :

   \`\`\`bash
   cd my-app
   npm run dev
   \`\`\`

3. Ouvre \`http://localhost:3000\`.

### Prochaines étapes

- Apprendre à récupérer des données dans les Server Components.
- Comprendre la différence avec les Client Components.
- Explorer les bonnes pratiques pour optimiser les performances.

### Ressources utiles

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Documentation App Router](https://nextjs.org/docs/app)
 