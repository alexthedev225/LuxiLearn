# Introduction aux Server Actions dans Next.js 15

Les **Server Actions** sont une fonctionnalité puissante de Next.js 15, utilisée avec l'**App Router**, permettant d'exécuter des fonctions côté serveur directement à partir de composants React ou de formulaires, sans créer d'API publique. Introduites dans Next.js 13 et optimisées dans Next.js 15 avec React 19, les Server Actions simplifient les mutations de données, comme les soumissions de formulaires ou les mises à jour de bases de données, tout en offrant une intégration fluide avec les **Server Components**. Elles sont marquées par la directive \`"use server"\` et permettent un développement full-stack sécurisé et performant. Ce cours explore comment implémenter les Server Actions pour gérer les formulaires et les données, avec des exemples pratiques en TypeScript. Conçu pour les débutants avec des bases en React, il fournit des explications claires, des bonnes pratiques, et des ressources pour approfondir.

## Objectifs

- Comprendre le rôle et les avantages des Server Actions dans Next.js 15.
- Apprendre à créer des Server Actions pour gérer les mutations côté serveur.
- Maîtriser l'utilisation des Server Actions avec les formulaires et les bases de données.
- Intégrer les Server Actions avec les Server Components et Client Components.
- Appliquer les bonnes pratiques pour la sécurité, la validation, et les performances.
- Découvrir les ressources pour approfondir les Server Actions.

## Prérequis

- **Connaissances techniques** :
  - JavaScript (ES6+) : variables, fonctions, async/await.
  - Bases de React : composants, JSX, props, hooks (ex. : \`useState\`).
  - (Optionnel) Familiarité avec TypeScript pour une meilleure intégration.
  - Connaissance de l'App Router et des Server Components (voir leçon "Introduction aux Server Components").
- **Environnement** :
  - Node.js 18.x ou plus récent installé.
  - Un projet Next.js 15 configuré (voir Installation).
  - Un éditeur de code (ex. : VS Code) et un terminal.
  - (Optionnel) Une base de données avec Prisma pour les exemples avancés.

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
   - \`lib/\` : Dossier pour les Server Actions et utilitaires (ex. : Prisma client).
   - \`.env.local\` : Variables d'environnement pour les clés API ou connexions à la base de données.
   - \`next.config.mjs\` : Configuration avancée (ex. : cache, Turbopack).

> **Astuce** : Utilisez \`npm run dev --turbo\` pour tester **Turbopack** (bêta dans Next.js 15), un compilateur plus rapide que Webpack.

## Fonctionnalités clés / Concepts importants

### 1. Qu'est-ce qu'une Server Action ?

- **Définition** : Une fonction asynchrone marquée par \`"use server"\`, exécutée côté serveur, qui peut être appelée depuis un composant React ou un formulaire.
- **Avantages** :
  - Simplifie les mutations sans créer d'API publique (comparé aux Route Handlers).
  - Intégration directe avec les formulaires via l'attribut \`action\`.
  - Accès sécurisé aux ressources serveur (ex. : bases de données, fichiers).
  - Supporte le rendu progressif avec React 19.
- **Cas d'usage** : Soumissions de formulaires, mises à jour de données, authentification.

### 2. Server Actions vs Route Handlers

- **Server Actions** :
  - Exécutées côté serveur via \`"use server"\`.
  - Idéales pour les mutations internes (ex. : formulaires, CRUD).
  - Intégrées avec les Server Components.
- **Route Handlers** :
  - Créent des endpoints API publics (ex. : \`app/api/route.ts\`).
  - Utiles pour les API exposées à des clients externes.
- **Quand utiliser Server Actions** : Préférer pour les interactions internes sécurisées.

### 3. Intégration avec les formulaires

- Les Server Actions peuvent être attachées à l'attribut \`action\` d'un formulaire.
- Supportent le rendu progressif avec \`useFormState\` et \`useFormStatus\` (React 19).
- Gèrent les erreurs et les redirections avec \`redirect\`.

### 4. Sécurité et validation

- Les Server Actions s'exécutent côté serveur, protégeant les secrets (ex. : clés API).
- Utilisez des bibliothèques comme \`zod\` pour valider les données des formulaires.
- Implémentez la gestion des erreurs avec try/catch.

### 5. Nouveautés dans Next.js 15

- **React 19** : Améliore les Server Actions avec un rendu progressif et des hooks comme \`useFormState\`.
- **Cache optimisé** : Meilleure gestion du cache pour les Server Actions.
- **Turbopack** : Accélère le développement et la construction.

> **Note** : Les Server Actions sont une alternative moderne aux API traditionnelles, offrant une intégration fluide avec les formulaires et les Server Components.

## Exemple de code

### 1. Server Action de base pour un formulaire (\`app/form/action.ts\` et \`app/form/page.tsx\`)

Crée une Server Action pour gérer un formulaire simple :

\`\`\`tsx
// app/form/action.ts
'use server';

export async function submitForm(formData: FormData) {
const name = formData.get('name') as string;
if (!name) {
throw new Error('Le nom est requis');
}
// Simulation d'enregistrement
console.log('Nom soumis :', name);
return { success: true, message: \`Bienvenue, \${name} !\` };
}
\`\`\`

\`\`\`tsx
// app/form/page.tsx
'use client';

import { useState } from 'react';
import { submitForm } from './action';

export default function FormPage() {
const [message, setMessage] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);

return (
<main className="p-6">
<h1 className="text-3xl font-bold">Formulaire</h1>
<form
action={async (formData) => {
try {
const result = await submitForm(formData);
setMessage(result.message);
setError(null);
} catch (e) {
setError((e as Error).message);
setMessage(null);
}
}}
className="mt-4 space-y-2" >
<input
          type="text"
          name="name"
          placeholder="Votre nom"
          className="p-2 border rounded"
        />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
Envoyer
</button>
{message && <p className="text-green-600">{message}</p>}
{error && <p className="text-red-600">{error}</p>}
</form>
</main>
);
}
\`\`\`

- **Explication** : La Server Action (\`action.ts\`) valide et traite les données du formulaire. Le Client Component (\`page.tsx\`) utilise l'attribut \`action\` pour appeler la Server Action. Accessible via \`http://localhost:3000/form\`.

### 2. Server Action avec redirection (\`app/register/action.ts\` et \`app/register/page.tsx\`)

Redirige après une soumission réussie :

\`\`\`tsx
// app/register/action.ts
'use server';

import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
const email = formData.get('email') as string;
if (!email || !email.includes('@')) {
throw new Error('Email invalide');
}
// Simulation d'enregistrement
console.log('Utilisateur enregistré :', email);
redirect('/success');
}
\`\`\`

\`\`\`tsx
// app/register/page.tsx
'use client';

import { useState } from 'react';
import { registerUser } from './action';

export default function RegisterPage() {
const [error, setError] = useState<string | null>(null);

return (
<main className="p-6">
<h1 className="text-3xl font-bold">Inscription</h1>
<form
action={async (formData) => {
try {
await registerUser(formData);
} catch (e) {
setError((e as Error).message);
}
}}
className="mt-4 space-y-2" >
<input
          type="email"
          name="email"
          placeholder="Votre email"
          className="p-2 border rounded"
        />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
S'inscrire
</button>
{error && <p className="text-red-600">{error}</p>}
</form>
</main>
);
}
\`\`\`

- **Explication** : La Server Action utilise \`redirect\` pour naviguer vers `/success` après une soumission réussie. Le Client Component gère les erreurs localement. Accessible via \`http://localhost:3000/register\`.

### 3. Server Action avec Prisma (\`lib/actions.ts\` et \`app/users/page.tsx\`)

Met à jour une base de données avec Prisma :

\`\`\`tsx
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

// lib/actions.ts
'use server';

import prisma from './prisma';
import { z } from 'zod';

const userSchema = z.object({
name: z.string().min(1, 'Le nom est requis'),
email: z.string().email('Email invalide'),
});

export async function createUser(formData: FormData) {
const data = userSchema.safeParse({
name: formData.get('name'),
email: formData.get('email'),
});

if (!data.success) {
throw new Error(data.error.errors[0].message);
}

const { name, email } = data.data;

try {
const user = await prisma.user.create({
data: { name, email },
});
return { success: true, message: \`Utilisateur créé : \${user.name}\` };
} catch (error) {
throw new Error('Erreur lors de la création de l’utilisateur');
}
}
\`\`\`

\`\`\`tsx
// app/users/page.tsx
'use client';

import { useState } from 'react';
import { createUser } from '@/lib/actions';

export default function UsersPage() {
const [message, setMessage] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);

return (
<main className="p-6">
<h1 className="text-3xl font-bold">Créer un utilisateur</h1>
<form
action={async (formData) => {
try {
const result = await createUser(formData);
setMessage(result.message);
setError(null);
} catch (e) {
setError((e as Error).message);
setMessage(null);
}
}}
className="mt-4 space-y-2" >
<input
          type="text"
          name="name"
          placeholder="Nom"
          className="p-2 border rounded"
        />
<input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
        />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
Créer
</button>
{message && <p className="text-green-600">{message}</p>}
{error && <p className="text-red-600">{error}</p>}
</form>
</main>
);
}
\`\`\`

- **Explication** : La Server Action utilise Prisma et \`zod\` pour valider et enregistrer un utilisateur dans une base de données (schéma : \`model User { id Int @id, name String, email String }\`). Le Client Component gère l'interface et les erreurs. Accessible via \`http://localhost:3000/users\`.

### 4. Server Action avec useFormState (\`app/contact/action.ts\` et \`app/contact/page.tsx\`)

Utilise le hook React 19 `useFormState` pour un état de formulaire :

\`\`\`tsx
// app/contact/action.ts
'use server';

import { redirect } from 'next/navigation';

export async function contactForm(prevState: any, formData: FormData) {
const message = formData.get('message') as string;
if (!message || message.length < 5) {
return { error: 'Le message doit contenir au moins 5 caractères' };
}
// Simulation d'envoi
console.log('Message envoyé :', message);
redirect('/success');
}
\`\`\`

\`\`\`tsx
// app/contact/page.tsx
'use client';

import { useFormState } from 'react-dom';
import { contactForm } from './action';

export default function ContactPage() {
const [state, formAction] = useFormState(contactForm, null);

return (
<main className="p-6">
<h1 className="text-3xl font-bold">Contact</h1>
<form action={formAction} className="mt-4 space-y-2">
<textarea
          name="message"
          placeholder="Votre message"
          className="p-2 border rounded w-full h-32"
        />
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
Envoyer
</button>
{state?.error && <p className="text-red-600">{state.error}</p>}
</form>
</main>
);
}
\`\`\`

- **Explication** : Utilise \`useFormState\` pour gérer l'état du formulaire côté client, avec une Server Action pour valider et rediriger. Accessible via \`http://localhost:3000/contact\`.

## Bonnes pratiques

- **Utiliser \`"use server"\`** :

  - Marquez toutes les Server Actions avec \`"use server"\` pour garantir leur exécution côté serveur.
  - Exemple :
    \`\`\`tsx
    'use server';
    export async function myAction() {}
    \`\`\`

- **Valider les données** :

  - Utilisez \`zod\` ou une validation manuelle pour sécuriser les entrées.
  - Exemple :
    \`\`\`tsx
    import { z } from 'zod';
    const schema = z.object({ email: z.string().email() });
    \`\`\`

- **Gérer les erreurs** :

  - Retournez des erreurs explicites avec try/catch ou des objets d'état.
  - Exemple :
    \`\`\`tsx
    if (!data) throw new Error('Données invalides');
    \`\`\`

- **Utiliser TypeScript** :

  - Définissez des types pour les données des formulaires :
    \`\`\`tsx
    interface FormData { name: string; email: string }
    \`\`\`

- **Protéger les secrets** :

  - Stockez les clés API et URL de base de données dans \`.env.local\` (ex. : \`DATABASE_URL=xxx\`) et accédez-y dans les Server Actions.

- **Redirection** :

  - Utilisez \`redirect\` pour naviguer après une action réussie :
    \`\`\`tsx
    import { redirect } from 'next/navigation';
    redirect('/success');
    \`\`\`

- **Organiser le code** :

  - Placez les Server Actions dans un dossier dédié (ex. : \`lib/actions.ts\`) pour la maintenabilité.
  - Exemple :
    \`\`\`tsx
    // lib/actions.ts
    'use server';
    export async function myAction() {}
    \`\`\`

- **Tester les performances** :
  - Utilisez Lighthouse pour évaluer les Core Web Vitals après l'intégration des formulaires.
  - Surveillez les journaux serveur pour déboguer les Server Actions.

## Ressources utiles

- [Documentation officielle Next.js : Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) : Guide sur les Server Actions.
- [Documentation officielle Next.js : App Router](https://nextjs.org/docs/app/building-your-application/routing) : Détails sur l'App Router.
- [React 19 Documentation](https://react.dev) : Informations sur \`useFormState\` et Server Actions.
- [Blog Next.js](https://nextjs.org/blog) : Mises à jour sur Next.js 15 et les Server Actions.
- [Vercel Platform](https://vercel.com) : Déploiement optimisé pour les Server Actions.
- [Next.js Learn : Server Actions](https://nextjs.org/learn) : Tutoriel interactif sur les Server Actions.
- [Article sur Server Actions](https://vercel.com/guides/nextjs-server-actions) : Explications approfondies.

## Prochaines étapes

- **Server Components avancés** : Intégrez des Server Actions avec des Server Components pour des mutations complexes.
- **Formulaires avancés** : Utilisez \`useFormStatus\` pour afficher l'état de soumission (ex. : bouton désactivé).
- **Base de données** : Approfondissez l'intégration avec Prisma ou Drizzle pour des opérations CRUD.
- **SEO et métadonnées** : Combine Server Actions avec des métadonnées dynamiques pour les pages de confirmation.
- **Déploiement** : Publiez sur Vercel pour tester les Server Actions en production.
- **Turbopack** : Testez \`npm run dev --turbo\` pour un développement plus rapide.

> **Note** : Les Server Actions simplifient le développement full-stack en éliminant le besoin d'API publiques. Testez régulièrement avec des outils comme Lighthouse et restez à jour avec la documentation Next.js.
