export default {
  description:
    "Créer une page SSR affichant des produits statiques via une fonction async.",
  starterCode: `
// app/products/page.jsx
export default async function ProductsPage() {
  const products = [];
  return (
    <div>
      <h1>Liste des produits</h1>
      {/* Affiche la liste ici */}
    </div>
  );
}
  `,
  solutionCode: `
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
  `,
  validate: ({ code }) => {
    // Vérifier que la fonction ProductsPage est async
    const isAsync = /export\s+default\s+async\s+function\s+ProductsPage/.test(
      code
    );
    if (!isAsync) {
      return {
        success: false,
        message: "Ta fonction `ProductsPage` doit être async.",
      };
    }

    // Vérifier qu’il y a une déclaration de tableau products avec des objets contenant une clé 'title'
    // Exemple simplifié: const products = [ { ... title: "..." ... }, ... ]
    const hasProductsArray =
      /const\s+products\s*=\s*\[\s*\{[^}]*title\s*:/s.test(code);
    if (!hasProductsArray) {
      return {
        success: false,
        message:
          "Tu dois définir un tableau contenant des objets avec une clé `title`.",
      };
    }

    // Vérifier que le code utilise products.map(...)
    const usesMap = /products\.map\s*\(/.test(code);
    if (!usesMap) {
      return {
        success: false,
        message: "Tu dois afficher les produits via `products.map(...)`.",
      };
    }

    return { success: true };
  },
};
