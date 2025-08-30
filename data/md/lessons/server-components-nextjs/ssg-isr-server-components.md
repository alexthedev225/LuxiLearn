const markdown = `
# SSG, ISR et Server Components avec Next.js 15 : Cours complet et à jour

---

## Introduction

Next.js 15 introduit des améliorations majeures dans la gestion du rendu côté serveur et côté client, notamment avec les **Server Components**, la **génération statique (SSG)** et la **régénération statique incrémentielle (ISR)**. Ces fonctionnalités permettent de construire des applications web performantes, scalables et modernes, tout en simplifiant la gestion des données.

Ce cours complet et à jour vous guide à travers ces concepts essentiels, avec des exemples concrets et des bonnes pratiques basées sur les nouveautés de Next.js 15.

---

## Sommaire

1. [Contexte et définitions clés](#contexte-et-definitions-clés)  
2. [Static Site Generation (SSG) dans Next.js 15](#static-site-generation-ssg-dans-nextjs-15)  
3. [Incremental Static Regeneration (ISR) dans Next.js 15](#incremental-static-regeneration-isr-dans-nextjs-15)  
4. [Server Components : principes et usage](#server-components-principes-et-usage)  
5. [Exemples pratiques combinés SSG, ISR et Server Components](#exemples-pratiques-combinés-ssg-isr-et-server-components)  
6. [Bonnes pratiques recommandées](#bonnes-pratiques-recommandées)  
7. [Ressources pour approfondir](#ressources-pour-approfondir)  
8. [Conclusion et prochaines étapes](#conclusion-et-prochaines-étapes)

---

## Contexte et définitions clés

Next.js 15 pousse encore plus loin l’intégration native des Server Components, permettant un rendu ultra-optimisé et des chargements rapides. Comprendre les stratégies de rendu est crucial pour construire des apps robustes et performantes.

- **SSG (Static Site Generation)** : pré-construction des pages HTML au moment du build, livrées instantanément.
- **ISR (Incremental Static Regeneration)** : mise à jour des pages statiques après déploiement, sans rebuild complet.
- **Server Components** : composants React rendus uniquement côté serveur, réduisant le JS envoyé au client.

---

## Static Site Generation (SSG) dans Next.js 15

### Principe

SSG génère des pages statiques lors du build, parfait pour du contenu stable ou peu changeant. Avec Next.js 15 et App Router, cela se fait naturellement via les Server Components asynchrones.

### Exemple SSG simple

\`\`\`tsx
// app/posts/page.tsx
export default async function PostsPage() {
  // fetch avec cache par défaut pour génération statique
  const posts = await fetch('https://api.example.com/posts', { cache: 'force-cache' }).then(r => r.json());

  return (
    <main>
      <h1>Liste des articles</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

### Explications

- \`cache: 'force-cache'\` indique à Next.js de pré-générer cette page au build.
- Le composant est asynchrone, récupérant les données côté serveur.
- Résultat : page rapide, SEO friendly, servie statiquement.

---

## Incremental Static Regeneration (ISR) dans Next.js 15

### Principe

ISR permet à Next.js de régénérer une page statique en arrière-plan après un délai spécifié, gardant le site à jour sans rebuild complet.

### Activation de l’ISR

On exporte une constante \`revalidate\` (en secondes) dans le fichier de page.

### Exemple ISR

\`\`\`tsx
// app/posts/[id]/page.tsx
export const revalidate = 120; // régénération toutes les 2 minutes

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await fetch(\`https://api.example.com/posts/\${id}\`, {
    next: { revalidate: 120 }
  }).then(r => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

### Explications

- \`revalidate = 120\` active ISR pour 120 secondes.
- \`next: { revalidate: 120 }\` dans fetch synchronise la donnée avec la régénération.
- Page servie statiquement mais mise à jour automatiquement.

---

## Server Components : principes et usage

### Fonctionnement

- Exécutés uniquement côté serveur.
- Pas de JS client ajouté, réduction du bundle.
- Accès direct aux API, bases de données, etc.
- Par défaut dans Next.js 15 \`app\` router.

### Exemple simple

\`\`\`tsx
export default async function UserProfile({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = await fetch(\`https://api.example.com/users/\${userId}\`).then(r => r.json());

  return (
    <section>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </section>
  );
}
\`\`\`

---

## Exemples pratiques combinés SSG, ISR et Server Components

### Exemple complet avec ISR et Server Component

\`\`\`tsx
// app/products/[slug]/page.tsx
export const revalidate = 60; // ISR toutes les 60 secondes

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await fetch(\`https://api.example.com/products/\${slug}\`, {
    next: { revalidate: 60 }
  }).then(r => r.json());

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Prix: {product.price} €</p>
    </main>
  );
}
\`\`\`

---

## Bonnes pratiques recommandées

- Privilégier **SSG** pour contenu stable (pages marketing, FAQ, docs).  
- Utiliser **ISR** pour contenu dynamique peu temps réel (blog, produits).  
- Toujours gérer les erreurs réseau dans les fetch (try/catch).  
- Éviter des valeurs de \`revalidate\` trop basses qui peuvent surcharger le serveur.  
- Exploiter pleinement les Server Components pour réduire le bundle client.  
- Mettre en place une stratégie de cache HTTP adaptée.  
- Tester en environnement de production pour valider ISR et rendu.

---

## Ressources pour approfondir

- [Next.js 15 Documentation officielle](https://nextjs.org/docs)  
- [Incremental Static Regeneration (ISR) dans Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)  
- [Server Components dans Next.js 15](https://nextjs.org/docs/app/building-your-application/routing#server-components)  
- [React Server Components - Documentation React](https://react.dev/learn/preface-to-server-components)  
- [Article technique Vercel sur ISR](https://vercel.com/blog/nextjs-incremental-static-regeneration)  

---

## Conclusion et prochaines étapes

Next.js 15 propose un écosystème complet et moderne combinant SSG, ISR et Server Components pour un rendu performant et scalable. Maîtriser ces concepts est indispensable pour créer des applications React avancées et optimisées.

### Prochaines étapes recommandées :

- Expérimenter avec des pages hybrides combinant SSR, SSG et ISR.  
- Implémenter des layouts et métadonnées dynamiques en Server Components.  
- Étudier la gestion fine du cache côté client (React Query, SWR).  
- Mesurer et optimiser les performances en production.

---

Bonne pratique : Toujours aligner la stratégie de rendu (SSG/ISR) avec la fréquence de mise à jour du contenu et les besoins utilisateurs.

`;
