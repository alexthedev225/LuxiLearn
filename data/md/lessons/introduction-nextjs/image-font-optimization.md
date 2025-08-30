# Optimisation des images et polices dans Next.js 15

L'optimisation des **images** et des **polices** est cruciale pour améliorer les performances des applications Next.js, réduire les temps de chargement, minimiser le **Cumulative Layout Shift (CLS)**, et optimiser le **SEO** (Search Engine Optimization). Dans Next.js 15, le composant **\`next/image\`** offre des fonctionnalités intégrées pour compresser, redimensionner, et servir des images au format moderne comme WebP, tandis que **\`next/font\`** permet d'auto-héberger et de précharger les polices pour éviter le **Flash of Invisible Text (FOIT)**. Ce cours explore comment utiliser ces outils dans l'**App Router** pour créer des applications rapides et efficaces. Conçu pour les débutants avec des bases en React, il fournit des exemples pratiques en TypeScript, des explications détaillées, et des bonnes pratiques pour maximiser les performances.

## Objectifs

- Comprendre l'importance de l'optimisation des images et polices pour les performances et le SEO.
- Apprendre à utiliser le composant \`next/image\` pour optimiser les images locales et distantes.
- Maîtriser l'intégration des polices avec \`next/font\` pour un chargement rapide et stable.
- Configurer les optimisations pour réduire le CLS et améliorer les Core Web Vitals (LCP, CLS, FID).
- Appliquer les bonnes pratiques pour la gestion des assets et la maintenabilité du code.
- Découvrir les ressources pour approfondir l'optimisation dans Next.js 15.

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
  - (Optionnel) Accès à un CDN ou une API d'images pour les images distantes.

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
   - \`public/\` : Dossier pour les images et polices statiques (ex. : \`/images/logo.png\`).
   - \`next.config.mjs\` : Configuration pour les images distantes et optimisations.
   - \`.env.local\` : Variables d'environnement pour les clés API ou CDN.

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Optimisation des images avec \`next/image\`

- **Rôle** : Le composant \`next/image\` remplace la balise HTML \`<img>\`, offrant :
  - **Compression** : Conversion automatique en WebP ou AVIF pour réduire la taille.
  - **Lazy loading** : Chargement différé des images hors viewport.
  - **Redimensionnement** : Génération de plusieurs tailles via \`srcset\` pour différents écrans.
  - **CLS réduit** : Maintien des dimensions pour éviter les sauts de mise en page.
- **Cas d'usage** : Images locales (dans \`public/\`), images distantes (CDN, CMS).
- **Core Web Vitals** :
  - **LCP (Largest Contentful Paint)** : Temps pour afficher le contenu principal (amélioré par WebP et lazy loading).
  - **CLS (Cumulative Layout Shift)** : Stabilité de la mise en page (réduite par des dimensions fixes).

### 2. Optimisation des polices avec \`next/font\`

- **Rôle** : Le module \`next/font\` permet d'auto-héberger et de précharger les polices, évitant les requêtes externes et le FOIT.
- **Fonctionnalités** :
  - **Auto-hébergement** : Télécharge les polices Google au moment de la construction.
  - **Préchargement** : Charge les polices critiques avant le rendu.
  - **Variable fonts** : Utilise des polices variables pour plus de flexibilité et moins de fichiers.
- **Cas d'usage** : Polices Google, polices locales (WOFF2).

### 3. Intégration avec l'App Router

- Les images et polices sont optimisées dans les **Server Components** par défaut.
- Les images distantes nécessitent une configuration dans \`next.config.mjs\` pour autoriser les domaines.

### 4. Nouveautés dans Next.js 15

- **React 19** : Support amélioré pour les Server Components, facilitant l'optimisation des assets.
- **Cache optimisé** : Meilleure gestion du cache pour les images statiques.
- **Turbopack** : Accélère la construction des projets avec assets optimisés.

> **Note** : Les images représentent souvent 50% du poids d'une page web. Une optimisation efficace avec \`next/image\` et \`next/font\` améliore les performances et le SEO.[](https://blog.takima.fr/optimisations-dimage-avec-next-js/)

## Exemple de code

### 1. Image statique avec \`next/image\` (\`app/page.tsx\`)

Optimise une image locale avec lazy loading :

\`\`\`tsx
// app/page.tsx
import Image from 'next/image';

export default function HomePage() {
return (

<main className="p-6">
<h1 className="text-3xl font-bold">Accueil</h1>
<Image
src="/images/logo.png"
alt="Logo de l'application"
width={500}
height={300}
className="mt-4"
priority={true} // Charger immédiatement pour LCP
/>
</main>
);
}
\`\`\`

- **Explication** : Utilise \`next/image\` pour une image dans \`public/images/logo.png\`. Les attributs \`width\` et \`height\` évitent le CLS, et \`priority\` optimise le LCP. La conversion en WebP est automatique. Accessible via \`http://localhost:3000\`.

### 2. Image distante avec loader personnalisé (\`app/products/[id]/page.tsx\`)

Optimise une image distante avec un CDN :

\`\`\`tsx
// next.config.mjs
/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'images.unsplash.com',
},
],
},
};
export default nextConfig;

// app/products/[id]/page.tsx
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams() {
return [{ id: '1' }, { id: '2' }]; // Exemple simplifié
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
const { id } = await params;
return {
title: \`Produit \${id}\`,
description: \`Détails du produit \${id}\`,
};
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
return (

<main className="p-6">
<h1 className="text-3xl font-bold">Produit {id}</h1>
<Image
src={\`https://images.unsplash.com/photo-16\${id}123456?ixlib=rb-4.0.3\`}
alt={\`Produit \${id}\`}
width={600}
height={400}
className="mt-4 rounded"
placeholder="blur"
blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB4A//Z"
/>
</main>
);
}
\`\`\`

- **Explication** : Configure un domaine autorisé dans \`next.config.mjs\` pour les images Unsplash. Utilise \`placeholder="blur"\` pour un effet de flou pendant le chargement, réduisant le CLS. Accessible via \`http://localhost:3000/products/1\`.

### 3. Police Google avec \`next/font\` (\`app/layout.tsx\`)

Auto-héberge une police Google pour tout le site :

\`\`\`tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
title: 'Mon application Next.js',
description: 'Une application optimisée avec Next.js 15',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (

<html lang="fr" className={inter.className}>
<body>
<nav className="bg-blue-600 text-white p-4">
<ul className="flex space-x-4">
<li><a href="/" className="hover:underline">Accueil</a></li>
<li><a href="/products" className="hover:underline">Produits</a></li>
</ul>
</nav>
{children}
</body>
</html>
);
}
\`\`\`

- **Explication** : Importe la police **Inter** avec \`next/font/google\`, appliquée globalement via \`className\`. L'option \`display: 'swap'\` évite le FOIT en utilisant une police de secours pendant le chargement.

### 4. Polices multiples et locales (\`app/about/page.tsx\`)

Utilise une police locale et une police Google spécifique :

\`\`\`tsx
// app/about/page.tsx
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { Metadata } from 'next';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });
const customFont = localFont({
src: [
{ path: '../../public/fonts/CustomFont-Regular.woff2', weight: '400', style: 'normal' },
{ path: '../../public/fonts/CustomFont-Bold.woff2', weight: '700', style: 'normal' },
],
display: 'swap',
});

export const metadata: Metadata = {
title: 'À propos - Mon application',
description: 'Page À propos avec polices optimisées',
};

export default function AboutPage() {
return (

<main className="p-6">
<h1 className={\`\${roboto.className} text-3xl font-bold\`}>À propos</h1>
<p className={\`\${customFont.className} mt-4 text-gray-700\`}>
Cette page utilise une police Google (Roboto) et une police locale optimisées.
</p>
</main>
);
}
\`\`\`

- **Explication** : Combine **Roboto** (Google) et une police locale (\`CustomFont\`) dans \`public/fonts/\`. Les deux sont préchargées avec \`display: 'swap'\` pour éviter le FOIT. Accessible via \`http://localhost:3000/about\`.

## Bonnes pratiques

- **Utiliser \`next/image\` pour toutes les images** :

  - Remplacez \`<img>\` par \`next/image\` pour bénéficier de l'optimisation automatique (WebP, lazy loading).
  - Exemple :
    \`\`\`tsx
    import Image from 'next/image';
    <Image src="/images/logo.png" alt="Logo" width={500} height={300} />
    \`\`\`

- **Spécifier les dimensions des images** :

  - Utilisez \`width\` et \`height\` pour éviter le CLS, ou \`fill\` pour les images dynamiques.
  - Exemple :
    \`\`\`tsx
    <Image src="/images/hero.jpg" alt="Hero" fill className="object-cover" />
    \`\`\`

- **Activer la priorité pour les images critiques** :

  - Utilisez \`priority={true}\` pour les images au-dessus de la ligne de flottaison (above-the-fold).
  - Exemple :
    \`\`\`tsx
    <Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} priority />
    \`\`\`

- **Configurer les images distantes** :

  - Ajoutez les domaines dans \`next.config.mjs\` pour éviter les erreurs :
    \`\`\`tsx
    images: {
    remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
    }
    \`\`\`

- **Utiliser des formats modernes** :

  - Privilégiez WebP ou AVIF pour réduire la taille des fichiers. Next.js convertit automatiquement les images statiques.[](https://blog.takima.fr/optimisations-dimage-avec-next-js/)

- **Auto-héberger les polices** :

  - Utilisez \`next/font\` pour éviter les requêtes externes à Google Fonts.
  - Exemple :
    \`\`\`tsx
    import { Inter } from 'next/font/google';
    const inter = Inter({ subsets: ['latin'], display: 'swap' });
    \`\`\`

- **Préférer les polices variables** :

  - Réduisez le nombre de fichiers en utilisant des polices variables (ex. : Inter, Roboto).
  - Exemple :
    \`\`\`tsx
    const inter = Inter({ subsets: ['latin'] });
    \`\`\`

- **Tester les performances** :

  - Utilisez Lighthouse pour évaluer les Core Web Vitals (LCP, CLS, FID).
  - Vérifiez le rendu avec l'inspecteur de navigateur pour détecter les CLS.

- **Utiliser un CDN** :
  - Configurez un CDN (ex. : Cloudinary, Imgix) pour les images distantes pour une diffusion rapide.[](https://blog.takima.fr/optimisations-dimage-avec-next-js/)
  - Exemple de loader personnalisé :
    \`\`\`tsx
    export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    return \`https://res.cloudinary.com/your-id/image/upload/w_\${width},q_\${quality || 75}/\${src}\`;
    }
    \`\`\`

## Ressources utiles

- [Documentation officielle Next.js : Images](https://nextjs.org/docs/app/building-your-application/optimizing/images) : Guide sur l'optimisation avec \`next/image\`.[](https://nextjs.org/docs/app/getting-started/images)
- [Documentation officielle Next.js : Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) : Guide sur l'utilisation de \`next/font\`.[](https://nextjs.org/docs/pages/getting-started/fonts)
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et les optimisations.
- [Vercel : Image Optimization](https://vercel.com/guides/nextjs-image-optimization) : Conseils pour optimiser les images.
- [Article sur le composant Image](https://www.premieroctet.com/blog/nextjs-image-component) : Explications détaillées sur \`next/image\`.[](https://www.premieroctet.com/blog/next-image-component)
- [Google Fonts](https://fonts.google.com) : Source pour les polices optimisées avec \`next/font\`.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) : Outil pour tester les performances et le SEO.

## Prochaines étapes

- **Métadonnées et SEO** : Combinez l'optimisation des images avec des métadonnées Open Graph pour les partages sociaux.
- **Server Components avancés** : Intégrez des images optimisées dans des Server Components avec récupération de données.
- **Loaders personnalisés** : Implémentez des loaders pour des CDN comme Cloudinary ou Imgix.
- **Sitemaps dynamiques** : Ajoutez les images dans un sitemap pour améliorer l'indexation SEO.
- **Déploiement** : Publiez sur Vercel pour bénéficier du cache automatique et de l'optimisation des images.
- **Turbopack** : Testez \`npm run build --turbo\` pour accélérer la construction avec assets optimisés.

> **Note** : L'optimisation des images et polices est essentielle pour des performances optimales et un bon SEO. Testez régulièrement avec Lighthouse et consultez la documentation Next.js pour les dernières améliorations.
