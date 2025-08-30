# Gestion des métadonnées pour le SEO dans Next.js 15

La gestion des **métadonnées** dans Next.js 15 est essentielle pour optimiser le **SEO** (Search Engine Optimization) et améliorer la visibilité des applications web sur les moteurs de recherche comme Google, ainsi que les partages sur les réseaux sociaux (ex. : Twitter, Facebook). Avec l'**App Router**, Next.js offre des outils puissants pour définir des métadonnées statiques (via l'objet \`metadata\`) et dynamiques (via la fonction \`generateMetadata\`), permettant de personnaliser les balises HTML (\`title\`, \`description\`) et les balises Open Graph pour les aperçus sociaux. Ce cours explore comment configurer les métadonnées dans Next.js 15 pour maximiser le SEO, avec des exemples pratiques en TypeScript pour les pages statiques et dynamiques. Conçu pour les débutants avec des bases en React, il fournit des explications claires, des bonnes pratiques, et des ressources pour approfondir.

## Objectifs

- Comprendre l'importance des métadonnées pour le SEO et les partages sociaux.
- Apprendre à configurer des métadonnées statiques avec l'objet \`metadata\`.
- Maîtriser la génération de métadonnées dynamiques avec \`generateMetadata\`.
- Intégrer les balises Open Graph pour optimiser les aperçus sur les réseaux sociaux.
- Appliquer les bonnes pratiques pour un SEO efficace et une maintenabilité du code.
- Découvrir les ressources pour approfondir la gestion des métadonnées.

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
  - (Optionnel) Accès à une API ou une base de données pour les métadonnées dynamiques.

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
   - \`public/\` : Ressources statiques (images pour Open Graph, favicon, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : domaines d'images pour Open Graph).
   - \`.env.local\` : Variables d'environnement pour les clés API.

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Importance des métadonnées pour le SEO
- **Définition** : Les métadonnées sont des informations incluses dans les balises HTML (\`<title>\`, \`<meta>\`) qui décrivent le contenu d'une page.
- **Rôle** :
  - **SEO** : Aide les moteurs de recherche à comprendre et classer la page.
  - **Réseaux sociaux** : Contrôle les aperçus partagés (ex. : titre, description, image).
- **Exemples** : Balises \`<title>\`, \`<meta name="description">\`, balises Open Graph (\`og:title\`, \`og:image\`).

### 2. Métadonnées statiques avec l'objet \`metadata\`
- **Rôle** : Définir des métadonnées globales ou par page dans les fichiers \`layout.tsx\` ou \`page.tsx\`.
- **Champs courants** :
  - \`title\` : Titre de la page.
  - \`description\` : Résumé du contenu.
  - \`openGraph\` : Balises pour les réseaux sociaux (ex. : \`og:title\`, \`og:image\`).
- **Cas d'usage** : Pages statiques comme l'accueil ou la page "À propos".

### 3. Métadonnées dynamiques avec \`generateMetadata\`
- **Rôle** : Générer des métadonnées basées sur des données dynamiques (ex. : paramètres d'URL, API).
- **Utilisation** : Fonction asynchrone exportée dans les fichiers de page pour les routes dynamiques.
- **Cas d'usage** : Pages de blog ou de produits avec contenu spécifique.

### 4. Open Graph et réseaux sociaux
- **Définition** : Protocole pour personnaliser les aperçus sur les réseaux sociaux (ex. : Twitter Cards, Facebook).
- **Configuration** : Ajouter des balises \`og:title\`, \`og:description\`, \`og:image\` dans l'objet \`metadata\`.
- **Hébergement des images** : Stocker les images dans \`public/\` ou un CDN.

### 5. Nouveautés dans Next.js 15
- **React 19** : Support amélioré pour les Server Components, permettant des métadonnées dynamiques asynchrones.
- **Optimisations SEO** : Meilleure gestion des balises canoniques et des sitemaps.
- **Turbopack** : Accélère la construction des pages statiques avec métadonnées.

> **Note** : Une gestion efficace des métadonnées améliore le classement SEO et l'engagement sur les réseaux sociaux, tout en restant simple à implémenter dans l'App Router.

## Exemple de code

### 1. Métadonnées statiques dans un layout global (\`app/layout.tsx\`)
Configure des métadonnées globales pour l'application :

\`\`\`tsx
// app/layout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mon application Next.js',
  description: 'Une application moderne construite avec Next.js 15',
  openGraph: {
    title: 'Mon application Next.js',
    description: 'Découvrez une application performante avec Next.js 15',
    images: ['/og-image.jpg'],
    url: 'https://my-next-app.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon application Next.js',
    description: 'Découvrez une application performante avec Next.js 15',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Accueil</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
\`\`\`

- **Explication** : Définit des métadonnées statiques pour toute l'application, incluant un titre, une description, et des balises Open Graph/Twitter. L'image \`/og-image.jpg\` doit être dans \`public/\`.

### 2. Métadonnées statiques pour une page (\`app/about/page.tsx\`)
Configure des métadonnées spécifiques pour une page statique :

\`\`\`tsx
// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - Mon application Next.js',
  description: 'En savoir plus sur notre application construite avec Next.js 15',
  openGraph: {
    title: 'À propos - Mon application Next.js',
    description: 'En savoir plus sur notre application',
    images: ['/about-og-image.jpg'],
  },
};

export default async function AboutPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">À propos</h1>
      <p className="mt-4 text-gray-700">
        Cette page utilise des métadonnées statiques pour optimiser le SEO.
      </p>
    </main>
  );
}
\`\`\`

- **Explanation** : Définit des métadonnées spécifiques pour la page `/about`, écrasant partiellement celles du layout global. Accessible via `http://localhost:3000/about`.

### 3. Métadonnées dynamiques pour une route dynamique (\`app/blog/[id]/page.tsx\`)
Génère des métadonnées basées sur des données dynamiques :

\`\`\`tsx
// app/blog/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      cache: 'force-cache',
    });
    const post: { id: number; title: string; body: string } = await response.json();

    return {
      title: post.title,
      description: post.body.slice(0, 150),
      openGraph: {
        title: post.title,
        description: post.body.slice(0, 150),
        images: ['/blog-og-image.jpg'],
      },
    };
  } catch (error) {
    return {
      title: 'Article non trouvé',
      description: 'Impossible de charger l’article.',
    };
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      cache: 'force-cache',
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

- **Explication** : Utilise `generateMetadata` pour générer des métadonnées dynamiques basées sur les données de l’API. Gère les erreurs pour éviter les métadonnées vides. Accessible via `http://localhost:3000/blog/1`.

### 4. Métadonnées avec SSG et generateStaticParams (\`app/products/[id]/page.tsx\`)
Combine SSG et métadonnées dynamiques :

\`\`\`tsx
// app/products/[id]/page.tsx
import { Metadata } from 'next';

export async function generateStaticParams() {
  const products = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
  return products.slice(0, 10).map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      cache: 'force-cache',
    });
    const product: { id: number; title: string; body: string } = await response.json();

    return {
      title: \`Produit : \${product.title}\`,
      description: product.body.slice(0, 150),
      openGraph: {
        title: \`Produit : \${product.title}\`,
        description: product.body.slice(0, 150),
        images: ['/product-og-image.jpg'],
      },
    };
  } catch (error) {
    return {
      title: 'Produit non trouvé',
      description: 'Impossible de charger le produit.',
    };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`, {
      cache: 'force-cache',
    });
    const product: { id: number; title: string; body: string } = await response.json();

    if (!product) {
      return (
        <main className="p-6">
          <h1 className="text-3xl font-bold text-red-600">Produit non trouvé</h1>
        </main>
      );
    }

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="mt-4 text-gray-700">{product.body}</p>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Erreur</h1>
        <p className="mt-4 text-gray-700">Impossible de charger le produit.</p>
      </main>
    );
  }
}
\`\`\`

- **Explication** : Combine `generateStaticParams` pour pré-rendre 10 produits en SSG et `generateMetadata` pour des métadonnées dynamiques. Accessible via `http://localhost:3000/products/1`.

## Bonnes pratiques

- **Définir des métadonnées concises** :
  - Gardez les titres sous 60 caractères et les descriptions sous 160 caractères pour le SEO.
  - Exemple :
    \`\`\`tsx
    export const metadata: Metadata = {
      title: 'Accueil - Mon App',
      description: 'Une application Next.js performante.',
    };
    \`\`\`

- **Utiliser generateMetadata pour les routes dynamiques** :
  - Récupérez les données dynamiques dans `generateMetadata` pour refléter le contenu de la page.
  - Exemple :
    \`\`\`tsx
    export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
      const { id } = await params;
      return { title: \`Article \${id}\` };
    }
    \`\`\`

- **Inclure les balises Open Graph** :
  - Ajoutez `openGraph` pour des aperçus attrayants sur les réseaux sociaux.
  - Stocker les images dans `public/` ou un CDN.
  - Exemple :
    \`\`\`tsx
    openGraph: {
      images: ['/og-image.jpg'],
      url: 'https://my-next-app.com',
    }
    \`\`\`

- **Gérer les erreurs** :
  - Fournissez des métadonnées par défaut en cas d'erreur dans `generateMetadata`.
  - Exemple :
    \`\`\`tsx
    try {
      const data = await fetch('https://api.example.com/data');
      return { title: data.title };
    } catch (error) {
      return { title: 'Erreur' };
    }
    \`\`\`

- **Utiliser TypeScript** :
  - Importez le type `Metadata` pour typer les métadonnées :
    \`\`\`tsx
    import { Metadata } from 'next';
    \`\`\`

- **Tester le SEO** :
  - Utilisez des outils comme Google Search Console ou Lighthouse pour vérifier les métadonnées.
  - Vérifiez les aperçus sociaux avec des outils comme Twitter Card Validator.

- **Configurer next.config.mjs pour les images** :
  - Autorisez les domaines externes pour les images Open Graph :
    \`\`\`tsx
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      images: {
        domains: ['example.com'],
      },
    };
    export default nextConfig;
    \`\`\`

## Ressources utiles

- [Documentation officielle Next.js : Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) : Guide sur la gestion des métadonnées.
- [Documentation officielle Next.js : App Router](https://nextjs.org/docs/app/building-your-application/routing) : Détails sur l'App Router et `generateMetadata`.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et le SEO.
- [React 19 Documentation](https://react.dev) : Informations sur les Server Components.
- [Vercel Platform](https://vercel.com) : Déploiement optimisé pour le SEO.
- [Next.js Learn : SEO](https://nextjs.org/learn) : Tutoriel interactif sur le SEO.
- [Article sur le SEO avec Next.js](https://vercel.com/guides/nextjs-seo) : Conseils pour optimiser le SEO.

## Prochaines étapes

- **Sitemaps et robots.txt** : Ajoutez un sitemap dynamique et configurez `robots.txt` pour améliorer l'indexation.
- **Server Components avancés** : Intégrez des métadonnées avec des données récupérées dans les Server Components.
- **Optimisation des images** : Utilisez `next/image` pour les images Open Graph.
- **Server Actions** : Combinez les métadonnées avec des formulaires gérés par Server Actions.
- **Déploiement** : Publiez sur Vercel pour tester le SEO en production.
- **Analyse SEO** : Utilisez Google Search Console et Lighthouse pour surveiller les performances SEO.

> **Note** : Une gestion efficace des métadonnées est cruciale pour le SEO et les partages sociaux. Testez régulièrement vos pages avec des outils SEO et restez à jour avec la documentation Next.js.
