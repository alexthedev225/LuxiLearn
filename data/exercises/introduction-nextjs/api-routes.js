export default {
  title: `
Créer une API Route complète avec Next.js 15 (Route Handler) pour gérer une liste de produits.

L'API doit :
- Supporter la méthode GET qui retourne tous les produits (JSON)
- Supporter la méthode POST qui ajoute un nouveau produit (avec validation simple)
- Gérer les erreurs avec des réponses HTTP appropriées (400, 500)
- Utiliser la signature correcte avec \`NextRequest\` et \`NextResponse\`
- Respecter les bonnes pratiques de code async/await
- Stocker les produits dans une variable interne mutable simulant une base de données (en mémoire)
`,

  prompt: `
// app/api/products/route.ts
import { NextResponse, type NextRequest } from "next/server";

// Variable mutable simulant une base de données en mémoire
let products = [
  { id: 1, name: "Produit A", price: 29.99 },
  { id: 2, name: "Produit B", price: 49.99 },
];

export async function GET(request: NextRequest) {
  // TODO: Retourner tous les produits au format JSON
}

export async function POST(request: NextRequest) {
  // TODO: Ajouter un nouveau produit avec validation des données
}
  `,

  solution: `
// app/api/products/route.ts
import { NextResponse, type NextRequest } from "next/server";

// Variable mutable simulant une base de données en mémoire
let products = [
  { id: 1, name: "Produit A", price: 29.99 },
  { id: 2, name: "Produit B", price: 49.99 },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Le champ 'name' est obligatoire et doit être une chaîne." }, { status: 400 });
    }

    if (price === undefined || typeof price !== "number") {
      return NextResponse.json({ error: "Le champ 'price' est obligatoire et doit être un nombre." }, { status: 400 });
    }

    const newProduct = { id: Date.now(), name, price };
    products = [...products, newProduct];

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
  `,

  validateCode: `
(code) => {
  const normalized = code.replace(/\\s+/g, " ").toLowerCase();

  if (!/export async function get\\s*\\(\\s*[\\w\\d]+\\s*\\)/.test(normalized)) {
    return {
      success: false,
      message:
        "La fonction GET doit être exportée, async, et recevoir un paramètre (request).",
    };
  }

  if (!/export async function post\\s*\\(\\s*[\\w\\d]+\\s*\\)/.test(normalized)) {
    return {
      success: false,
      message:
        "La fonction POST doit être exportée, async, et recevoir un paramètre (request).",
    };
  }

  if (!/try\\s*{/.test(code) || !/catch\\s*\\(.*?\\)/.test(code)) {
    return {
      success: false,
      message:
        "La fonction POST doit gérer les erreurs avec un bloc try/catch.",
    };
  }

  if (!/if\\s*\\([^)]*name[^)]*\\)/.test(normalized)) {
    return {
      success: false,
      message: "La fonction POST doit valider la présence du champ 'name'.",
    };
  }

  if (!/if\\s*\\([^)]*price[^)]*\\)/.test(normalized)) {
    return {
      success: false,
      message: "La fonction POST doit valider la présence du champ 'price'.",
    };
  }

  if (!/let\\s+products\\s*=\\s*\\[/.test(code)) {
    return {
      success: false,
      message: "La variable 'products' doit être déclarée avec 'let'.",
    };
  }

  if (!/products\\s*=\\s*\\[/.test(code)) {
    return {
      success: false,
      message:
        "La fonction POST doit modifier la variable 'products' (simulant la base de données).",
    };
  }

  if (
    !/export async function get[\\s\\S]*?nextresponse\\.json\\s*\\(/.test(
      normalized
    )
  ) {
    return {
      success: false,
      message:
        "La fonction GET doit retourner une réponse JSON avec NextResponse.json(...).",
    };
  }

  if (
    !/export async function post[\\s\\S]*?nextresponse\\.json\\s*\\(/.test(
      normalized
    )
  ) {
    return {
      success: false,
      message:
        "La fonction POST doit retourner une réponse JSON avec NextResponse.json(...).",
    };
  }

  return { success: true };
}
`,
};
