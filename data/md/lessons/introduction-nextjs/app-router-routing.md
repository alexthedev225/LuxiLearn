## Routage avec Next.js App Router

Le routage est basé sur le dossier \`app/\`.

### Création de pages
- Chaque dossier représente une route.
- \`page.jsx\` est la page par défaut.
- Les routes dynamiques utilisent des dossiers entre crochets, ex: \`[id]\`.

### Exemple de route dynamique
\`\`\`jsx
// app/users/[id]/page.jsx
export default function UserProfile({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profil utilisateur #" + params.id + "</h1>
    </div>
  );
}
\`\`\`

Accessible à \`/users/123\`.

### Layouts imbriqués
- \`layout.jsx\` dans chaque dossier pour définir la structure.
- Permet de partager des parties de l'interface.

### Navigation
- Utilise \`Link\` de \`next/link\`.
- \`useRouter\` dans les composants client uniquement.

### Exercice
Crée une page dynamique \`/users/[id]\` qui affiche l’ID utilisateur passé en paramètre.
  