
export default {
  description:
    "Crée une page Server Component affichant une liste d’articles statiques.",
  starterCode: `
// app/articles/page.jsx
export default async function ArticlesPage() {
  const articles = [];
  return (
    <div>
      <h1>Liste des articles</h1>
      {/* Affiche la liste ici */}
    </div>
  );
}
  `,
  solutionCode: `
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
  `,
  validate: async ({ code }) => {
    const hasAsync = /export\s+default\s+async\s+function\s+\w+/g.test(code);
    const hasArticles =
      /const\s+\w+\s*=\s*\[\s*\{[^}]*title[^}]*author[^}]*\}/s.test(code);
    const hasList = /<ul>[\s\S]*<li[\s\S]*<\/li>[\s\S]*<\/ul>/g.test(code);

    if (!hasAsync) {
      return "Ta fonction doit être asynchrone pour simuler une récupération de données.";
    }

    if (!hasArticles) {
      return "Tu dois définir un tableau d'articles statiques avec au moins un titre et un auteur.";
    }

    if (!hasList) {
      return "Tu dois afficher les articles dans une liste `<ul>` avec des `<li>`.";
    }

    return true;
  },
};
