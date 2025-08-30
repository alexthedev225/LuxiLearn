export default [
  {
    id: 1,
    description:
      "Créer une page SSR affichant une liste statique de produits via une fonction async (App Router).",
    starterCode: `
// app/products/page.jsx
export default async function ProductsPage() {
  const products = [];
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Liste des produits</h1>
      <ul>
        {/* Affiche la liste ici */}
      </ul>
    </main>
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
    <main className="p-6">
      <h1 className="text-3xl font-bold">Liste des produits</h1>
      <ul className="mt-4 space-y-2">
        {products.map(product => (
          <li key={product.id} className="text-gray-700">
            {product.title} - {"$" + product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
    `,
    validate: ({ code }) => {
      const isAsync = /export\s+default\s+async\s+function\s+ProductsPage/.test(
        code
      );
      if (!isAsync)
        return {
          success: false,
          message: "La fonction ProductsPage doit être async.",
        };

      const hasProductsArray =
        /const\s+products\s*=\s*\[\s*\{[^}]*title\s*:/s.test(code);
      if (!hasProductsArray)
        return {
          success: false,
          message:
            "Un tableau 'products' avec des objets contenant la clé 'title' est requis.",
        };

      const usesMap = /products\.map\s*\(/.test(code);
      if (!usesMap)
        return {
          success: false,
          message: "Utilise products.map pour afficher la liste.",
        };

      return { success: true };
    },
  },

  {
    id: 2,
    description:
      "Créer une page dynamique SSR affichant les détails d'un utilisateur selon l'ID passé dans les params (params est une promesse).",
    starterCode: `
// app/users/[id]/page.jsx
export default async function UserPage({ params }) {
  // TODO : extraire l'id depuis params (promise)
  // TODO : récupérer les infos utilisateur via fetch
  // TODO : afficher le nom de l'utilisateur
  return (
    <main className="p-6">
      <h1>Détails utilisateur</h1>
    </main>
  );
}
    `,
    solutionCode: `
// app/users/[id]/page.jsx
export default async function UserPage({ params }) {
  const { id } = await params; // Déstructurer la promesse params
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, { cache: 'no-store' });
    const user = await res.json();
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Utilisateur : {user.name}</h1>
        <p>Email : {user.email}</p>
      </main>
    );
  } catch {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Erreur</h1>
        <p>Impossible de charger l'utilisateur.</p>
      </main>
    );
  }
}
    `,
    validate: ({ code }) => {
      const awaitsParams = /const\s+\{\s*id\s*\}\s*=\s*await\s*params/.test(
        code
      );
      if (!awaitsParams)
        return {
          success: false,
          message: "Tu dois await la promesse params et extraire id.",
        };

      const fetchCall =
        /fetch\s*\(\s*`https:\/\/jsonplaceholder.typicode.com\/users\/\$\{id\}`/.test(
          code
        );
      if (!fetchCall)
        return {
          success: false,
          message:
            "Tu dois utiliser fetch pour récupérer les données utilisateur.",
        };

      const jsxUsesUserName = /Utilisateur\s*:\s*{user\.name}/.test(code);
      if (!jsxUsesUserName)
        return {
          success: false,
          message: "Le JSX doit afficher le nom de l'utilisateur.",
        };

      return { success: true };
    },
  },

  {
    id: 3,
    description:
      "Créer une API route SSR qui retourne la liste des utilisateurs en JSON sans cache (App Router).",
    starterCode: `
// app/api/users/route.jsx
import { NextResponse } from 'next/server';

export async function GET() {
  // TODO : récupérer les utilisateurs depuis l'API externe
  // TODO : retourner les données en JSON
}
    `,
    solutionCode: `
// app/api/users/route.jsx
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
    const users = await res.json();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
  }
}
    `,
    validate: ({ code }) => {
      const hasFetch =
        /await\s+fetch\s*\(\s*['"]https:\/\/jsonplaceholder.typicode.com\/users['"]/.test(
          code
        );
      if (!hasFetch)
        return {
          success: false,
          message: "Tu dois faire un fetch vers l'API externe.",
        };

      const returnsJson = /NextResponse\.json\s*\(/.test(code);
      if (!returnsJson)
        return {
          success: false,
          message: "Tu dois retourner une réponse JSON via NextResponse.json.",
        };

      return { success: true };
    },
  },
];
