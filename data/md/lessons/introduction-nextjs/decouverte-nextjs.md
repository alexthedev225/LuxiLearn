## Découverte de Next.js

Next.js est un framework React complet qui facilite la création d'applications web performantes et modernes. Il combine le meilleur du rendu côté serveur (SSR), de la génération statique (SSG), et du rendu côté client.

### Fonctionnalités clés de Next.js

- **Rendu côté serveur (SSR)** : Permet de générer les pages à la volée côté serveur pour un contenu toujours à jour.
- **Génération statique (SSG)** : Génère des pages HTML statiques à la construction, idéales pour le SEO et la rapidité.
- **Routage basé sur les fichiers** : Le système de fichiers détermine automatiquement les routes de votre application.
- **Support TypeScript intégré** : Pas besoin de config supplémentaire.
- **API Routes** : Créez des endpoints backend simples dans le même projet.
- **Support du mode ISR (Incremental Static Regeneration)** : Rafraîchit automatiquement les pages statiques après un certain délai.

### Pourquoi choisir Next.js ?

- **SEO amélioré** : Grâce au SSR et au SSG, les moteurs de recherche peuvent indexer facilement le contenu.
- **Performance** : Chargement rapide des pages avec pré-rendu.
- **Développement rapide** : Avec le hot reload, la simplicité du routage, et la structure claire du projet.
- **Flexibilité** : Vous pouvez mixer SSR, SSG, et CSR (Client Side Rendering) selon les besoins.

### Prérequis

- Avoir Node.js version 18 ou plus récente installée.
- Connaissances de base en JavaScript et React.
- (Optionnel) Connaissances en TypeScript.

### Installation et premier projet

1. Ouvre ton terminal et lance la commande suivante pour créer un nouveau projet Next.js :

   \`\`\`bash
   npx create-next-app@latest my-next-app
   \`\`\`

   Cette commande crée un projet prêt à l’emploi avec toutes les configurations par défaut.

2. Place-toi dans le dossier du projet et démarre le serveur de développement :

   \`\`\`bash
   cd my-next-app
   npm run dev
   \`\`\`

3. Ouvre ton navigateur à l’adresse \`http://localhost:3000\`.

Tu verras la page d’accueil générée par défaut par Next.js.

### Structure du projet

- \`app/\` : Contient les pages et routes via le nouveau **App Router** (Next.js 13+).
- \`public/\` : Fichiers statiques (images, favicon, etc.).
- \`components/\` : Composants React réutilisables.
- \`styles/\` : Fichiers CSS globaux (optionnels).
- \`next.config.js\` : Configuration avancée du projet.

### Premier composant React dans Next.js

Crée un fichier \`app/page.jsx\` avec le code suivant :

\`\`\`jsx
export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur Next.js !</h1>
      <p>Ceci est ma première page.</p>
    </div>
  );
}
\`\`\`

Ce composant est une fonction React qui retourne un fragment JSX simple.

### Fonctionnement du routage

- Chaque fichier \`page.jsx\` correspond à une route.
- Exemple : \`app/about/page.jsx\` est accessible via \`/about\`.
- Les routes dynamiques utilisent des dossiers entre crochets, par exemple \`app/users/[id]/page.jsx\`.

### Modes de rendu

- Par défaut, les pages dans \`app/\` sont des **Server Components** (rendues côté serveur).
- On peut forcer des composants à être côté client avec \`"use client";\`.
- Next.js gère automatiquement le chargement et la génération des pages.

### Prochaines étapes

- Découvrir le routage dynamique.
- Comprendre le rendu côté serveur (SSR).
- Apprendre à utiliser les API Routes intégrées.
- Ajouter du style avec Tailwind CSS (dans une leçon dédiée).

### Ressources utiles

- Documentation officielle Next.js : https://nextjs.org/docs
- Tutoriels Next.js sur YouTube et plateformes comme Frontend Mentor.
        