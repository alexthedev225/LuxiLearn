## API Routes dans Next.js App Router

Les API Routes se créent dans \`app/api/\` avec des fichiers \`route.js\`.

### Exemple simple
\`\`\`js
// app/api/hello/route.js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Bonjour, monde !" });
}
\`\`\`

Accessible via \`/api/hello\`.

### Paramètres dynamiques
\`\`\`js
// app/api/users/[id]/route.js
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  return NextResponse.json({ id: params.id, name: "Utilisateur " + params.id });
}
\`\`\`

### Tester l'API
\`\`\`js
fetch("/api/hello")
  .then(res => res.json())
  .then(data => console.log(data));
\`\`\`

### Bonnes pratiques
- Utiliser des noms de routes clairs.
- Gérer les erreurs avec des codes de statut HTTP.
- Tester les routes avec des outils comme Postman.

### Ressources utiles
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)
 