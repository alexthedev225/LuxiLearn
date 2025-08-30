# Streaming et Suspense avec Server Components dans Next.js 15

## Introduction

Avec Next.js 15, la gestion du rendu côté serveur a été optimisée grâce à l'intégration de React 18, introduisant ainsi le streaming et le suspense. Ces fonctionnalités permettent de charger les pages de manière progressive, améliorant ainsi la performance perçue et l'expérience utilisateur. Ce cours explore comment utiliser le streaming et le suspense avec les Server Components pour créer des applications rapides et réactives.:contentReference[oaicite:6]{index=6}

---

## Sommaire

1. [Comprendre le Streaming et le Suspense](#comprendre-le-streaming-et-le-suspense)
2. [Mise en place dans Next.js 15](#mise-en-place-dans-nextjs-15)
3. [Exemples pratiques](#exemples-pratiques)
4. [Bonnes pratiques](#bonnes-pratiques)
5. [Ressources supplémentaires](#ressources-supplémentaires)
6. [Conclusion](#conclusion)

---

## Comprendre le Streaming et le Suspense

### Streaming

Le streaming permet d'envoyer le contenu HTML au fur et à mesure de sa génération, plutôt que d'attendre que tout soit prêt. Cela réduit le temps de rendu initial et améliore la réactivité de l'application. Next.js 15 utilise le streaming pour envoyer des parties de la page dès qu'elles sont prêtes, sans attendre le rendu complet. :contentReference[oaicite:13]{index=13}:contentReference[oaicite:14]{index=14}

### Suspense

Le Suspense est une fonctionnalité de React qui permet de gérer les états de chargement de manière déclarative. En enveloppant un composant avec un `<Suspense>`, on peut définir un fallback (par exemple, un spinner) à afficher pendant que le composant attend la résolution de ses données. Cela simplifie la gestion des états de chargement et améliore la lisibilité du code. :contentReference[oaicite:21]{index=21}:contentReference[oaicite:22]{index=22}

---

## Mise en place dans Next.js 15

### 1. Configuration du projet

Assurez-vous d'utiliser la version la plus récente de Next.js 15 avec le support du streaming et du suspense :​:contentReference[oaicite:25]{index=25}

\`\`\`bash
npm install next@canary react@rc react-dom@rc
\`\`\`:contentReference[oaicite:28]{index=28}

Activez le Partial Prerendering dans votre fichier `next.config.js` :​:contentReference[oaicite:31]{index=31}

\`\`\`js
/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
experimental: {
ppr: true,
},
};

module.exports = nextConfig;
\`\`\`:contentReference[oaicite:34]{index=34}

### 2. Utilisation du Suspense

Enveloppez vos composants asynchrones avec `<Suspense>` pour gérer les états de chargement :​:contentReference[oaicite:37]{index=37}

\`\`\`tsx
import { Suspense } from 'react';

function Page() {
return (
<Suspense fallback={<div>Chargement...</div>}>
<ComposantDynamique />
</Suspense>
);
}
\`\`\`:contentReference[oaicite:40]{index=40}

Cela affichera "Chargement..." pendant que `ComposantDynamique` attend la résolution de ses données.:contentReference[oaicite:43]{index=43}

### 3. Streaming avec Server Components

Les Server Components sont traités côté serveur par défaut dans Next.js 15. En les combinant avec le streaming, vous pouvez envoyer des parties de la page dès qu'elles sont prêtes :​:contentReference[oaicite:48]{index=48}

\`\`\`tsx
// app/page.tsx
import { Suspense } from 'react';
import DonneesLentes from './DonneesLentes';

export default function Page() {
return (
<main>
<h1>Bienvenue</h1>
<Suspense fallback={<div>Chargement des données...</div>}>
<DonneesLentes />
</Suspense>
</main>
);
}
\`\`\`:contentReference[oaicite:51]{index=51}

Dans cet exemple, `DonneesLentes` est un Server Component qui simule un délai de chargement. Grâce au streaming, le reste de la page est rendu immédiatement, tandis que `DonneesLentes` est chargé en arrière-plan. :contentReference[oaicite:56]{index=56}:contentReference[oaicite:57]{index=57}

---

## Exemples pratiques

### 1. Composant avec données lentes

Créons un Server Component qui simule un délai de 4 secondes :​:contentReference[oaicite:60]{index=60}

\`\`\`tsx
// app/DonneesLentes.tsx
export default async function DonneesLentes() {
await new Promise(resolve => setTimeout(resolve, 4000));
return <div>Données chargées après 4 secondes</div>;
}
\`\`\`:contentReference[oaicite:63]{index=63}

En enveloppant ce composant avec `<Suspense>`, vous pouvez gérer l'état de chargement de manière élégante.:contentReference[oaicite:66]{index=66}

### 2. Chargement parallèle

Pour éviter les requêtes en cascade (waterfall), vous pouvez effectuer des chargements parallèles :​:contentReference[oaicite:69]{index=69}

\`\`\`tsx
// app/page.tsx
import { Suspense } from 'react';
import DonneesUtilisateur from './DonneesUtilisateur';
import DonneesProduits from './DonneesProduits';

export default function Page() {
return (
<main>
<h1>Bienvenue</h1>
<Suspense fallback={<div>Chargement...</div>}>
<DonneesUtilisateur />
<DonneesProduits />
</Suspense>
</main>
);
}
\`\`\`:contentReference[oaicite:72]{index=72}

Cela permet de charger les données utilisateur et produit en parallèle, réduisant ainsi le temps de chargement global.:contentReference[oaicite:75]{index=75}

---

## Bonnes pratiques

- **Utiliser le streaming judicieusement** : Ne streamez pas l'intégralité de la page si certaines parties sont lentes à charger.
- **Placer les frontières de suspense stratégiquement** : Enveloppez les composants qui dépendent de données lentes avec `<Suspense>` pour améliorer l'expérience utilisateur.
- **Éviter les requêtes en cascade** : Utilisez le chargement parallèle pour optimiser les performances.
- **Gérer les erreurs** : Utilisez des composants comme `<ErrorBoundary>` pour capturer et gérer les erreurs dans les composants enfants.:contentReference[oaicite:84]{index=84}

---

## Ressources supplémentaires

- [Documentation officielle de Next.js sur le streaming et le suspense](https://nextjs.org/docs/app/getting-started/streaming)
- [Tutoriel vidéo sur le streaming et le suspense dans Next.js 15](https://www.youtube.com/watch?v=cwjsoOZVK34)
- [Article de Wisp sur la maîtrise du suspense dans Next.js 15](https://www.wisp.blog/blog/mastering-react-suspense-in-nextjs-15-a-developers-guide)

---

## Conclusion

Le streaming et le suspense sont des outils puissants pour améliorer la performance et l'expérience utilisateur dans les applications Next.js 15. En les utilisant judicieusement, vous pouvez créer des applications réactives et rapides, offrant ainsi une meilleure expérience aux utilisateurs.:contentReference[oaicite:89]{index=89}
