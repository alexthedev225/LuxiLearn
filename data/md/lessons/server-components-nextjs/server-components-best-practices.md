## Bonnes pratiques pour les Server Components

Les Server Components sont puissants, mais il est important de suivre des bonnes pratiques pour maximiser leurs avantages.

### 1. Maximiser les Server Components

- Utilisez les Server Components pour le rendu initial et la récupération de données.
- Réduisez l’utilisation des Client Components pour minimiser le JavaScript client.

### 2. Passer des données via props

Passez les données des Server Components aux Client Components via des props pour éviter les requêtes inutiles côté client.

\`\`\`jsx
// app/profile/page.jsx
import ClientProfile from "../components/ClientProfile";

export default async function ProfilePage() {
  const user = { id: 1, name: "Utilisateur 1" };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profil</h1>
      <ClientProfile user={user} />
    </div>
  );
}

// components/ClientProfile.jsx
"use client";

export default function ClientProfile({ user }) {
  return (
    <div>
      <p className="text-gray-300">Nom : {user.name}</p>
    </div>
  );
}
\`\`\`

### 3. Gérer les erreurs

Ajoutez une gestion d’erreurs dans les Server Components avec try/catch.

\`\`\`jsx
// app/data/page.jsx
export default async function DataPage() {
  try {
    const res = await fetch("https://api.example.com/data", { cache: "no-store" });
    const data = await res.json();
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Données</h1>
        <p className="text-gray-300">{data.message}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Erreur</h1>
        <p className="text-gray-300">Impossible de charger les données.</p>
      </div>
    );
  }
}
\`\`\`

### 4. Optimiser la mise en cache

- Utilisez \`"no-store"\` pour des données dynamiques.
- Utilisez \`"force-cache"\` pour des données statiques.

### 5. Tester vos pages

Testez vos Server Components avec des outils comme Postman pour les API ou en inspectant le HTML généré.

### Exercice

Crée une page Server Component avec une gestion d’erreurs pour afficher un message statique.

### Ressources utiles

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
  