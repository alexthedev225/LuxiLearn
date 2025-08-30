# Déploiement et optimisation des performances dans Next.js 15

Le **déploiement** et l'**optimisation des performances** sont des étapes cruciales pour garantir qu'une application Next.js 15 offre une expérience utilisateur rapide, fiable, et optimisée pour le **SEO** (Search Engine Optimization). Avec l'**App Router**, Next.js 15 facilite le déploiement via **Vercel**, une plateforme optimisée pour les applications Next.js, et propose des outils comme **Turbopack**, le cache optimisé, et l'intégration avec **React 19** pour maximiser les performances. Ce cours explore comment déployer une application sur Vercel, optimiser les performances à l'aide de techniques comme la **Static Site Generation (SSG)** et l'**Incremental Static Regeneration (ISR)**, et utiliser **Lighthouse** pour mesurer les **Core Web Vitals** (LCP, CLS, FID). Conçu pour les débutants avec des bases en React, il fournit des exemples pratiques en TypeScript, des explications détaillées, et des bonnes pratiques pour des applications performantes.

## Objectifs

- Comprendre le processus de déploiement d'une application Next.js sur Vercel.
- Apprendre à optimiser les performances avec SSG, ISR, et les outils intégrés de Next.js 15.
- Maîtriser l'utilisation de Lighthouse pour mesurer et améliorer les Core Web Vitals.
- Intégrer les optimisations dans l'App Router et les Server Components.
- Appliquer les bonnes pratiques pour le déploiement et les performances.
- Découvrir les ressources pour approfondir le déploiement et l'optimisation.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) : variables, fonctions, async/await.
  - Bases de React : composants, JSX, props.
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router, Server Components, SSG, et ISR (voir leçons précédentes).
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir Installation).
  - Un compte Vercel (gratuit pour les projets personnels).
  - Un éditeur de code (ex. : VS Code) et un terminal.

## Installation

1. **Créer un projet Next.js 15** :
   Exécutez la commande suivante pour initialiser un projet avec l'App Router :

   \`\`\`bash
   npx create-next-app@latest my-next-app
   \`\`\`

   - Sélectionnez TypeScript (recommandé) et l'App Router (par défaut).
   - Acceptez les configurations par défaut pour Tailwind CSS si souhaité.

2. **Démarrer le projet localement** :
   Accédez au dossier et lancez le serveur de développement :

   \`\`\`bash
   cd my-next-app
   npm run dev
   \`\`\`

3. **Vérifier l’application** :
   Ouvre \`http://localhost:3000\` dans ton navigateur pour voir la page par défaut.

4. **Structure du projet** :
   - \`app/\` : Contient les routes, pages, et layouts (Server Components par défaut).
   - \`public/\` : Ressources statiques (images, favicon).
   - \`next.config.mjs\` : Configuration pour les optimisations et le déploiement.
   - \`.env.local\` : Variables d'environnement pour les clés API ou connexions à la base de données.

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack, pour accélérer le développement.

## Fonctionnalités clés / Concepts importants

### 1. Déploiement sur Vercel
- **Rôle** : Vercel est la plateforme recommandée pour déployer les applications Next.js, offrant un déploiement automatique, un cache optimisé, et un support pour SSG/ISR.
- **Avantages** :
  - Déploiement en un clic via Git (GitHub, GitLab, Bitbucket).
  - Prévisualisation automatique des branches (Previews).
  - Gestion des domaines et certificats SSL automatiques.
- **Étapes** : Connecter un dépôt Git, configurer les variables d'environnement, et déployer.

### 2. Optimisation des performances
- **Static Site Generation (SSG)** : Génère le HTML à la construction pour des temps de chargement rapides.
- **Incremental Static Regeneration (ISR)** : Met à jour les pages statiques en arrière-plan avec un intervalle de revalidation.
- **next/image** : Optimise les images avec WebP, lazy loading, et redimensionnement.
- **next/font** : Auto-héberge les polices pour éviter le FOIT (Flash of Invisible Text).
- **Turbopack** : Remplace Webpack pour une construction plus rapide.

### 3. Mesure des performances avec Lighthouse
- **Rôle** : Lighthouse est un outil intégré à Chrome DevTools pour évaluer les Core Web Vitals :
  - **LCP (Largest Contentful Paint)** : Temps pour afficher le contenu principal.
  - **CLS (Cumulative Layout Shift)** : Stabilité de la mise en page.
  - **FID (First Input Delay)** : Réactivité aux interactions (remplacé par INP dans les versions récentes).
- **Utilisation** : Exécuter Lighthouse dans Chrome ou via Vercel pour identifier les goulots d'étranglement.

### 4. Nouveautés dans Next.js 15
- **React 19** : Améliore le rendu asynchrone et les Server Components.
- **Turbopack** : Accélère la construction et le développement.
- **Cache optimisé** : Meilleure gestion du cache pour SSG et ISR.
- **Dynamic Rendering** : Permet de basculer entre SSR et SSG dynamiquement.

> **Note** : Un déploiement efficace et des performances optimisées améliorent l'expérience utilisateur, le SEO, et réduisent les coûts d'infrastructure.

## Exemple de code

### 1. Configuration pour le déploiement (\`next.config.mjs\`)
Configure le projet pour Vercel et Turbopack :

\`\`\`tsx
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    turbopack: true, // Activer Turbopack pour la construction
  },
  output: 'standalone', // Optimisé pour Vercel
};

export default nextConfig;
\`\`\`

- **Explication** : Configure les domaines pour les images distantes, active Turbopack, et utilise le mode `standalone` pour un déploiement optimisé sur Vercel.

### 2. Page optimisée avec SSG et next/image (\`app/page.tsx\`)
Optimise une page d'accueil avec SSG et images :

\`\`\`tsx
// app/page.tsx
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accueil - Mon application',
  description: 'Une application optimisée avec Next.js 15',
};

export default async function HomePage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache', // SSG
  });
  const posts: { id: number; title: string }[] = await response.json();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Accueil</h1>
      <Image
        src="/images/hero.jpg"
        alt="Image principale"
        width={1200}
        height={600}
        priority
        className="mt-4 rounded"
      />
      <ul className="mt-4 space-y-2">
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} className="text-gray-700">{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

- **Explication** : Utilise SSG avec `cache: 'force-cache'` et `next/image` avec `priority` pour optimiser le LCP. Accessible via `http://localhost:3000`.

### 3. Page avec ISR et next/font (\`app/news/page.tsx\`)
Optimise une page avec ISR et une police Google :

\`\`\`tsx
// app/news/page.tsx
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Actualités - Mon application',
  description: 'Dernières actualités mises à jour avec ISR',
};

export default async function NewsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache',
    next: { revalidate: 3600 }, // ISR toutes les heures
  });
  const posts: { id: number; title: string; body: string }[] = await response.json();

  return (
    <main className={\`\${roboto.className} p-6\`}>
      <h1 className="text-3xl font-bold">Actualités</h1>
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
}
\`\`\`

- **Explication** : Utilise ISR avec `revalidate: 3600` et `next/font` pour optimiser la police, réduisant le FOIT et le CLS. Accessible via `http://localhost:3000/news`.

### 4. Déploiement sur Vercel avec variables d'environnement (\`.env.local\` et \`app/api/config/route.ts\`)
Configure une API pour tester le déploiement :

\`\`\`bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
API_KEY="my-secret-key"
\`\`\`

\`\`\`tsx
// app/api/config/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.API_KEY;
  return NextResponse.json({ message: 'Configuration OK', apiKey: apiKey ? 'Set' : 'Not set' });
}
\`\`\`

- **Explication** : Les variables d'environnement sont configurées dans `.env.local` et utilisées dans une Route Handler. Sur Vercel, ajoutez ces variables dans le tableau de bord (Settings > Environment Variables). Testez via `http://localhost:3000/api/config` ou l'URL de production.

### 5. Analyse avec Lighthouse
Pour exécuter Lighthouse :
1. Ouvre Chrome DevTools (F12).
2. Va à l'onglet **Lighthouse**.
3. Sélectionne **Performance**, **SEO**, et **Best Practices**.
4. Clique sur **Generate report**.

Exemple de résultats attendus :
- **LCP** : < 2,5 s (grâce à `next/image` et SSG).
- **CLS** : < 0,1 (grâce à `width`/`height` et `next/font`).
- **INP (Interaction to Next Paint)** : < 200 ms (remplace FID dans les versions récentes).

## Bonnes pratiques

- **Préférer SSG et ISR** :
  - Utilisez SSG (`cache: 'force-cache'`) pour les pages statiques et ISR (`next: { revalidate: N }`) pour les pages semi-dynamiques.
  - Exemple :
    \`\`\`tsx
    await fetch('https://api.example.com/data', { next: { revalidate: 3600 } });
    \`\`\`

- **Optimiser les images** :
  - Utilisez `next/image` avec `priority` pour les images critiques et `placeholder="blur"` pour les autres.
  - Exemple :
    \`\`\`tsx
    import Image from 'next/image';
    <Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
    \`\`\`

- **Utiliser next/font** :
  - Auto-hébergez les polices avec `next/font` pour réduire les requêtes externes.
  - Exemple :
    \`\`\`tsx
    import { Inter } from 'next/font/google';
    const inter = Inter({ subsets: ['latin'], display: 'swap' });
    \`\`\`

- **Configurer Vercel correctement** :
  - Ajoutez les variables d'environnement dans le tableau de bord Vercel.
  - Activez les déploiements automatiques et les Previews pour les branches.
  - Exemple : Configurez `DATABASE_URL` dans Vercel Settings.

- **Utiliser Turbopack** :
  - Activez Turbopack pour des builds plus rapides :
    \`\`\`tsx
    experimental: { turbopack: true }
    \`\`\`

- **Tester avec Lighthouse** :
  - Exécutez Lighthouse après chaque déploiement pour vérifier les Core Web Vitals.
  - Ciblez LCP < 2,5 s, CLS < 0,1, INP < 200 ms.

- **Surveiller les performances** :
  - Utilisez Vercel Analytics ou Speed Insights pour monitorer les performances en production.
  - Vérifiez les journaux serveur pour détecter les erreurs.

- **Utiliser TypeScript** :
  - Définissez des types pour les données et métadonnées :
    \`\`\`tsx
    interface Post { id: number; title: string; body: string }
    import { Metadata } from 'next';
    \`\`\`

## Ressources utiles

- [Documentation officielle Next.js : Deployment](https://nextjs.org/docs/app/building-your-application/deploying) : Guide sur le déploiement avec Vercel.
- [Documentation officielle Next.js : Optimizing](https://nextjs.org/docs/app/building-your-application/optimizing) : Conseils pour les performances.
- [Vercel Documentation](https://vercel.com/docs) : Détails sur le déploiement et les analytics.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et Turbopack.
- [React 19 Documentation](https://react.dev) : Informations sur les Server Components et le rendu.
- [Next.js Learn : Deployment](https://nextjs.org/learn) : Tutoriel interactif sur le déploiement.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) : Outil pour mesurer les performances.

## Prochaines étapes

- **Server Actions** : Intégrez des Server Actions pour des interactions dynamiques post-déploiement.
- **SEO avancé** : Ajoutez des sitemaps dynamiques et configurez `robots.txt` pour améliorer l'indexation.
- **Analytics** : Configurez Vercel Analytics ou Google Analytics pour surveiller le trafic.
- **CDN pour images** : Utilisez un CDN (ex. : Cloudinary) avec `next/image` pour accélérer les images.
- **Turbopack** : Testez `npm run build --turbo` pour des builds plus rapides.
- **Monitoring** : Utilisez Vercel Speed Insights pour analyser les performances en production.

> **Note** : Un déploiement optimisé et des performances bien surveillées garantissent une expérience utilisateur fluide et un bon SEO. Testez régulièrement avec Lighthouse et restez à jour avec la documentation Next.js.
