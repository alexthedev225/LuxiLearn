export default {
  description: "Créer une API Route qui renvoie une liste de produits.",
  starterCode: `
// app/api/products/route.js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([]);
}
  `,
  solutionCode: `
// app/api/products/route.js
import { NextResponse } from "next/server";

const products = [
  { id: 1, name: "Produit A", price: 29.99 },
  { id: 2, name: "Produit B", price: 49.99 },
];

export async function GET() {
  return NextResponse.json(products);
}
  `,
  validate: (code) => {
    const normalized = code.replace(/\s+/g, " ").toLowerCase();

    // 1. Vérifie que la fonction GET est async
    if (!/export async function get\s*\(\s*\)/.test(normalized)) {
      return {
        success: false,
        message: "La fonction GET doit être exportée et déclarée async.",
      };
    }

    // 2. Vérifie qu'on appelle bien NextResponse.json avec un argument
    const jsonCallMatch = normalized.match(/nextresponse\.json\s*\((.+?)\)/);
    if (!jsonCallMatch) {
      return {
        success: false,
        message: "Tu dois retourner la réponse avec `NextResponse.json(...)`.",
      };
    }
    const responseArg = jsonCallMatch[1].trim();

    // 3. Vérifie que responseArg correspond à une variable tableau déclarée
    const arrayDeclarationRegex = new RegExp(
      `(const|let|var)\\s+${responseArg}\\s*=\\s*\\[.*?\\]`,
      "s"
    );
    if (!arrayDeclarationRegex.test(code)) {
      return {
        success: false,
        message: `La variable '${responseArg}' doit être un tableau déclaré.`,
      };
    }

    // 4. Vérifie que le tableau contient au moins un objet avec id, name et price
    const objectFieldsRegex =
      /\{\s*[^}]*id\s*:\s*[\w\d]+[^}]*name\s*:\s*['"][^'"]+['"][^}]*price\s*:\s*\d+(\.\d+)?[^}]*\}/;
    if (!objectFieldsRegex.test(code)) {
      return {
        success: false,
        message:
          "Le tableau doit contenir au moins un objet avec les clés `id`, `name` et `price`.",
      };
    }

    return { success: true };
  },
};
