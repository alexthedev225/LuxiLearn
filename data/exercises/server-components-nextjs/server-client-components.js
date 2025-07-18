export default {
  description:
    "Crée une page avec un Server Component affichant un message et un Client Component avec un compteur.",
  starterCode: `
// app/page.jsx
import ClientButton from "../components/ClientButton";

export default async function Home() {
  const data = { message: "Bonjour depuis le serveur !" };
  return (
    <div>
      <h1>Accueil</h1>
      {/* Affiche le message et ajoute le ClientButton */}
    </div>
  );
}

// components/ClientButton.jsx
"use client";

import { useState } from "react";

export default function ClientButton() {
  return (
    <div>
      {/* Ajoute un compteur */}
    </div>
  );
}
  `,
  solutionCode: `
// app/page.jsx
import ClientButton from "../components/ClientButton";

export default async function Home() {
  const data = { message: "Bonjour depuis le serveur !" };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Accueil</h1>
      <p className="text-gray-300">{data.message}</p>
      <ClientButton />
    </div>
  );
}

// components/ClientButton.jsx
"use client";

import { useState } from "react";

export default function ClientButton() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p className="text-gray-300">Compte : {count}</p>
      <button
        className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg"
        onClick={() => setCount(count + 1)}
      >
        Incrémenter
      </button>
    </div>
  );
}
  `,
  validate: ({ code }) => {
    // Vérifie présence du Server Component Home
    const hasHomeFunction =
      /export\s+default\s+async\s+function\s+Home\s*\(/.test(code);
    const hasImportClientButton =
      /import\s+ClientButton\s+from\s+["'][^"']+ClientButton["']/.test(code);
    const hasMessageParagraph = /<p[^>]*>\s*{data\.message}\s*<\/p>/.test(code);
    const hasClientButtonInJSX = /<ClientButton\s*\/>/.test(code);

    // Vérifie le composant ClientButton en mode client
    const hasUseClientDirective = /"use client";/.test(code);
    const hasUseStateImport =
      /import\s*{\s*useState\s*}\s*from\s*['"]react['"]/.test(code);
    const hasCountState =
      /const\s*\[\s*count\s*,\s*setCount\s*\]\s*=\s*useState\s*\(\s*0\s*\)/.test(
        code
      );
    const hasCountDisplayed = /Compte\s*:\s*{count}/.test(code);
    const hasButtonOnClickIncrement =
      /onClick\s*=\s*\{\s*.*setCount\s*\(\s*count\s*\+\s*1\s*\).*}\s*/.test(
        code
      );

    if (!hasHomeFunction)
      return "Le composant Home doit être une fonction asynchrone exportée par défaut.";
    if (!hasImportClientButton)
      return "Il faut importer ClientButton dans le fichier app/page.jsx.";
    if (!hasMessageParagraph)
      return "Le message provenant du serveur doit être affiché dans un paragraphe.";
    if (!hasClientButtonInJSX)
      return "Le composant <ClientButton /> doit être inclus dans le JSX de Home.";
    if (!hasUseClientDirective)
      return 'Le fichier ClientButton.jsx doit contenir la directive "use client".';
    if (!hasUseStateImport)
      return "Le hook useState doit être importé dans ClientButton.jsx.";
    if (!hasCountState)
      return "Le state 'count' doit être initialisé avec useState(0).";
    if (!hasCountDisplayed)
      return "Le compteur doit être affiché dans un paragraphe.";
    if (!hasButtonOnClickIncrement)
      return "Le bouton doit incrémenter le compteur au clic.";

    return true;
  },
};
