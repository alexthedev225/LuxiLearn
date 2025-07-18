## Récupérer des données dans les Server Components

Les Server Components permettent de récupérer des données directement sur le serveur, ce qui est idéal pour afficher du contenu dynamique (comme des produits ou des articles) sans charger de JavaScript côté client.

### Pourquoi récupérer des données côté serveur ?

- **Performance** : Moins de requêtes client-serveur.
- **SEO** : Le contenu dynamique est inclus dans le HTML initial.
- **Simplicité** : Pas besoin de hooks comme \`useEffect\` ou de fonctions comme \`getServerSideProps\`.

### Exemple : Afficher une liste d’articles

\`\`\`jsx
// app/articles/page.jsx
export default async function ArticlesPage() {
  const articles = [
    { id: 1, title: "Article 1", author: "Auteur A" },
    { id: 2, title: "Article 2", author: "Auteur B" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Liste des articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id} className="text-gray-300">
            {article.title} par {article.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### Utiliser fetch dans un Server Component

Vous pouvez utiliser la fonction \`fetch\` directement dans un Server Component pour récupérer des données d’une API.

\`\`\`jsx
// app/news/page.jsx
export default async function NewsPage() {
  const res = await fetch("https://api.example.com/news", { cache: "no-store" });
  const news = await res.json();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Actualités</h1>
      <ul>
        {news.map(item => (
          <li key={item.id} className="text-gray-300">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

- **\`cache: "no-store"\`** : Désactive la mise en cache pour des données toujours fraîches (SSR pur).
- **Alternative** : Utilisez \`"force-cache"\` pour la génération statique (SSG).

### Bonnes pratiques

- Utilisez des données statiques pour les tests ou les petits projets.
- Pour des données réelles, connectez-vous à une API ou une base de données.
- Gérez les erreurs avec des blocs try/catch.

### Exercice

Crée une page qui affiche une liste d’articles statiques dans un Server Component.

### Ressources utiles

- [Fetching Data in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching)
   