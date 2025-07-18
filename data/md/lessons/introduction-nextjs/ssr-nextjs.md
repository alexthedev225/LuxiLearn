## Rendu côté serveur (SSR) avec Next.js App Router

Next.js intègre depuis la version 13 un nouveau système de routage appelé **App Router** qui facilite le rendu côté serveur (SSR) par défaut. Contrairement au système classique basé sur le dossier \`pages/\`, l’App Router repose sur les Server Components React.

### Qu'est-ce que le SSR ?

Le rendu côté serveur (SSR) signifie que le HTML est généré par le serveur à chaque requête, avant d’être envoyé au navigateur. Cela permet d’avoir un contenu prêt à afficher immédiatement, ce qui améliore la performance perçue et le référencement SEO.

### Comment Next.js gère le SSR avec l'App Router ?

Dans le dossier \`app/\`, tous les composants sont Server Components par défaut. Cela signifie qu’ils s’exécutent côté serveur avant d’être envoyés au client. Ainsi, les données peuvent être récupérées et intégrées dans la page sans JavaScript côté client.

Par exemple, une page \`ProductsPage\` qui récupère une liste de produits pourra faire un appel à une API ou une base de données directement dans la fonction asynchrone qui exporte la page.

### Exemple de page SSR simple

\`\`\`jsx
// app/products/page.jsx
export default async function ProductsPage() {
  const products = [
    { id: 1, title: "Produit A", price: 29.99 },
    { id: 2, title: "Produit B", price: 49.99 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Liste des produits</h1>
      <ul>
        {products.map(product => (
          <li key={product.id} className="text-gray-300">
            {product.title} - {"$" + product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### Avantages du SSR avec Next.js App Router

- **SEO amélioré** : Le contenu est disponible dès le chargement initial.
- **Performances** : Chargement plus rapide et meilleure expérience utilisateur.
- **Simplification** : Plus besoin d’utiliser \`getServerSideProps\` ou \`getStaticProps\`.
- **Flexibilité** : Possibilité de combiner Server Components et Client Components dans la même page.

### Bonnes pratiques

- Privilégier les Server Components pour récupérer les données côté serveur.
- Utiliser \`"use client"\` uniquement pour les composants nécessitant des interactions côté client.
- Gérer la mise en cache selon les besoins : \`"no-store"\` pour données dynamiques, \`"force-cache"\` pour données statiques.

### Prochaines étapes

Nous verrons dans la prochaine leçon comment créer des routes dynamiques et imbriquées avec l’App Router.

### Ressources utiles

- [Next.js SSR](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
  