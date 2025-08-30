# API Routes avec l'App Router dans Next.js 15

Les **API Routes** dans Next.js 15, appelées **Route Handlers** dans l'App Router, permettent de créer des endpoints backend directement dans une application Next.js, éliminant le besoin d'un serveur séparé. Introduits avec l'App Router dans Next.js 13 et optimisés dans la version 15, les Route Handlers utilisent les API Web standard (\`Request\` et \`Response\`) et s'intègrent parfaitement avec les Server Components. Ils sont idéaux pour créer des APIs RESTful, gérer des requêtes HTTP, ou proxy des services externes. Ce cours explore en détail la création, la gestion, et l'optimisation des Route Handlers, avec des exemples pratiques et des bonnes pratiques pour des applications performantes et sécurisées.

## Objectifs

- Comprendre le rôle des Route Handlers dans l'App Router de Next.js 15.
- Créer des endpoints API pour différentes méthodes HTTP (GET, POST, etc.).
- Gérer les paramètres dynamiques et les données des requêtes.
- Implémenter des fonctionnalités avancées comme le streaming et la gestion des erreurs.
- Appliquer les bonnes pratiques pour la sécurité, la performance, et la maintenabilité.
- Découvrir les différences avec les Server Actions et les anciens API Routes (Pages Router).

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) et bases de React (composants, JSX).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router et des Server Components.
  - Notions de base sur les requêtes HTTP (GET, POST, etc.).
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir Installation).
  - Un éditeur de code (ex. : VS Code) et un terminal.
  - (Optionnel) Un outil comme Postman ou curl pour tester les endpoints.

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
   - \`app/api/\` : Dossier pour les Route Handlers (ex. : \`app/api/blogs/route.ts\`).
   - \`public/\` : Fichiers statiques (images, etc.).
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, runtime Edge).

> **Astuce** : Testez Turbopack (bêta dans Next.js 15) avec \`npm run dev --turbo\` pour un démarrage plus rapide.[](https://nextjs.org/blog/next-15)

## Fonctionnalités clés / Concepts importants

### 1. Route Handlers dans l'App Router

- Les Route Handlers remplacent les API Routes du Pages Router (\`pages/api/\`).
- Situés dans \`app/api/\`, ils sont définis dans des fichiers nommés \`route.ts\` (ou \`.tsx\`).
- Utilisent les API Web standard (\`Request\`/\`Response\`) et \`"next/server"\` pour des fonctionnalités spécifiques (\`NextRequest\`/\`NextResponse\`).
- Supportent les méthodes HTTP : GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.

### 2. Gestion des paramètres dynamiques

- Les dossiers avec crochets (ex. : \`[id]\`) dans \`app/api/\` créent des routes dynamiques.
- Les paramètres sont accessibles via une \`Promise\` dans l'objet \`params\`.

### 3. Gestion des requêtes

- Accès aux données via :
  - \`request.query\` : Paramètres de requête (ex. : \`?id=123\`).
  - \`request.json()\` : Corps de la requête en JSON.
  - \`request.formData()\` : Données de formulaire multipart.
  - \`cookies()\` et \`headers()\` : Cookies et en-têtes asynchrones.

### 4. Caching et performances

- Par défaut, les Route Handlers ne sont pas mis en cache dans Next.js 15, favorisant le rendu dynamique.[](https://www.wisp.blog/blog/nextjs-15-api-get-and-post-request-examples)
- Utilisez \`revalidate\` pour contrôler la mise en cache ou ISR (Incremental Static Regeneration).
- Support du runtime Edge pour des performances optimisées.

### 5. Streaming

- Les Route Handlers supportent le streaming de réponses pour les données volumineuses.
- Utilisent des API comme \`ReadableStream\` pour envoyer des données en continu.

### 6. Différences avec Server Actions

- **Route Handlers** : Pour des APIs publiques ou des endpoints RESTful.
- **Server Actions** : Pour des mutations internes (ex. : formulaires) avec \`"use server"\`.[](https://www.wisp.blog/blog/server-actions-vs-api-routes-in-nextjs-15-which-should-i-use)

> **Note** : Les Route Handlers sont plus adaptés aux APIs publiques, tandis que les Server Actions simplifient les mutations internes sans exposer d'endpoint public.

## Exemple de code

### 1. Route Handler GET simple (\`app/api/hello/route.ts\`)

Crée un endpoint qui renvoie un message JSON :

\`\`\`tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Gère les requêtes GET
export async function GET(request: NextRequest) {
return NextResponse.json({ message: 'Bonjour depuis l’API Next.js 15 !' }, { status: 200 });
}
\`\`\`

- **Explication** : Accessible via \`http://localhost:3000/api/hello\`. Renvoie un JSON avec un statut 200. Utilise \`NextResponse\` pour une réponse standardisée.

### 2. Route Handler avec méthodes multiples (\`app/api/blogs/route.ts\`)

Gère plusieurs méthodes HTTP (GET, POST) :

\`\`\`tsx
// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Gère les requêtes GET pour récupérer tous les blogs
export async function GET(request: NextRequest) {
// Simulation de données
const blogs = [
{ id: 1, title: 'Premier article', slug: 'premier-article' },
{ id: 2, title: 'Second article', slug: 'second-article' },
];
return NextResponse.json(blogs, { status: 200 });
}

// Gère les requêtes POST pour créer un blog
export async function POST(request: NextRequest) {
try {
const body = await request.json(); // Récupère le corps JSON
const { title, slug } = body;

    // Validation simple
    if (!title || !slug) {
      return NextResponse.json({ error: 'Titre et slug requis' }, { status: 400 });
    }

    // Simulation de création
    const newBlog = { id: Date.now(), title, slug };
    return NextResponse.json(newBlog, { status: 201 });

} catch (error) {
return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
}
}
\`\`\`

- **Explication** : Cet endpoint gère GET pour lister les blogs et POST pour en créer un. Les erreurs sont gérées avec try/catch, et les données sont validées avant traitement.

### 3. Route dynamique (\`app/api/blogs/[id]/route.ts\`)

Crée un endpoint dynamique pour un blog spécifique :

\`\`\`tsx
// app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Gère les requêtes GET pour un blog spécifique
export async function GET(
request: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
const { id } = await params; // Déstructuration de la Promise

// Simulation de récupération de données
const blog = { id: Number(id), title: \`Article \${id}\`, slug: \`article-\${id}\` };

if (!blog) {
return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
}

return NextResponse.json(blog, { status: 200 });
}
\`\`\`

- **Explication** : Accessible via \`http://localhost:3000/api/blogs/123\`. Le paramètre \`id\` est extrait via \`await params\`, conformément à Next.js 15.

### 4. Streaming avec Route Handler (\`app/api/stream/route.ts\`)

Crée un endpoint qui diffuse des données en continu :

\`\`\`tsx
// app/api/stream/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
const encoder = new TextEncoder();
const stream = new ReadableStream({
async start(controller) {
for (let i = 0; i < 5; i++) {
controller.enqueue(encoder.encode(\`Donnée \${i + 1}\\n\`));
await new Promise((resolve) => setTimeout(resolve, 1000));
}
controller.close();
},
});

return new Response(stream, {
headers: { 'Content-Type': 'text/plain' },
});
}
\`\`\`

- **Explanation** : Cet endpoint diffuse des données toutes les secondes. Utilise \`ReadableStream\` pour le streaming, idéal pour les données volumineuses.

### 5. Middleware pour sécuriser une API (\`middleware.ts\`)

Protège les Route Handlers avec un middleware :

\`\`\`tsx
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
if (request.nextUrl.pathname.startsWith('/api')) {
const token = request.headers.get('authorization');
if (!token || token !== 'Bearer mon-token-secret') {
return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
}
}
return NextResponse.next();
}

export const config = {
matcher: ['/api/:path*'],
};
\`\`\`

- **Explication** : Ce middleware vérifie un jeton d'autorisation pour toutes les routes sous \`/api\`. Configurez le matcher pour cibler les Route Handlers.

## Bonnes pratiques

- **Utiliser TypeScript** : Ajoutez des types pour les requêtes et réponses pour une meilleure maintenabilité.[](https://medium.com/%40salihbezai98/how-to-set-up-api-routes-in-next-js-15-7a53e2e09b50)
- **Valider les données** : Utilisez des bibliothèques comme \`zod\` ou \`yup\` pour valider les corps de requêtes. Exemple :
  \`\`\`tsx
  import { z } from 'zod';
  const schema = z.object({ title: z.string(), slug: z.string() });
  \`\`\`
- **Gérer les erreurs** : Implémentez des blocs try/catch pour capturer les erreurs et renvoyer des réponses appropriées (ex. : 400, 500).
- **Sécuriser les endpoints** : Utilisez des middlewares pour l'authentification et activez HTTPS en production.[](https://refine.dev/blog/next-js-api-routes/)
- **Optimiser le cache** : Définissez \`revalidate\` pour ISR ou utilisez \`cache: 'no-store'\` pour des données dynamiques.[](https://www.wisp.blog/blog/nextjs-15-api-get-and-post-request-examples)
- **Choisir Route Handlers ou Server Actions** : Utilisez Route Handlers pour les APIs publiques, Server Actions pour les mutations internes.[](https://www.wisp.blog/blog/server-actions-vs-api-routes-in-nextjs-15-which-should-i-use)
- **Tester les endpoints** : Utilisez Postman, curl, ou des bibliothèques comme \`xunnamius\` pour tester les Route Handlers.[](https://blog.arcjet.com/testing-next-js-app-router-api-routes/)

## Ressources utiles

- [Documentation officielle Next.js : Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Blog Next.js](https://nextjs.org/blog) pour les mises à jour sur Next.js 15[](https://nextjs.org/blog/next-15)
- [Guide des API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-handlers) pour les routes dynamiques
- [React 19 Documentation](https://react.dev) pour les Server Components et Server Actions
- [Vercel Platform](https://vercel.com) pour déployer vos APIs
- [Wisp CMS : Server Actions vs Route Handlers](https://www.wisp.blog/blog/server-actions-vs-api-routes-next-js-15) pour comparer les approches[](https://www.wisp.blog/blog/server-actions-vs-api-routes-in-nextjs-15-which-should-i-use)

## Prochaines étapes

- **Routes dynamiques avancées** : Explorez \`generateStaticParams\` pour combiner Route Handlers avec SSG.
- **Server Actions** : Apprenez à utiliser \`"use server"\` pour des mutations internes sans exposer d'endpoint.
- **Middleware avancé** : Implémentez des middlewares pour la journalisation, la limitation de requêtes, ou CORS.
- **Streaming avancé** : Testez le streaming avec des données en temps réel (ex. : WebSockets).
- **Déploiement** : Déployez vos Route Handlers sur Vercel avec le runtime Edge pour des performances optimales.
- **Turbopack** : Expérimentez \`npm run dev --turbo\` pour accélérer le développement.

> **Note** : Testez vos Route Handlers avec des outils comme Postman et surveillez les performances avec Lighthouse pour optimiser la latence et le SEO.
