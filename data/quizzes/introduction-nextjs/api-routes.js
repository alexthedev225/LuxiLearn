export default [
  {
    question:
      "Où place-t-on les Route Handlers (API Routes) dans Next.js 15 avec l'App Router ?",
    options: [
      "Dans le dossier app/pages/",
      "Dans le dossier app/api/",
      "Dans le dossier public/api/",
      "Dans le dossier components/",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Quelle signature doit avoir une fonction Route Handler pour gérer une requête GET ?",
    options: [
      "export function GET()",
      "export async function GET()",
      "export async function GET(request: NextRequest)",
      "export function GET(request)",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Quelle classe Next.js doit-on utiliser pour retourner une réponse JSON dans un Route Handler ?",
    options: ["Response", "NextResponse", "JsonResponse", "HttpResponse"],
    correctAnswer: 1,
  },
  {
    question:
      "Comment récupère-t-on les données JSON envoyées dans une requête POST dans un Route Handler ?",
    options: [
      "request.body",
      "await request.json()",
      "request.params",
      "request.query",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Comment accède-t-on aux paramètres dynamiques dans un Route Handler (ex: /api/products/[id]) ?",
    options: [
      "const { id } = request.params",
      "const { id } = params",
      "const { id } = await params (paramètre passé à la fonction)",
      "const { id } = request.query",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Quelle méthode HTTP n'est PAS supportée directement par les Route Handlers dans Next.js 15 ?",
    options: ["GET", "POST", "PATCH", "FTP"],
    correctAnswer: 3,
  },
  {
    question:
      "Quelle est la bonne manière de gérer les erreurs dans un Route Handler ?",
    options: [
      "Ignorer les erreurs, Next.js les gère automatiquement",
      "Utiliser un try/catch et retourner des réponses avec un statut HTTP adapté",
      "Retourner toujours status 200 avec un message d'erreur dans le JSON",
      "Lancer une exception et ne rien gérer",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Pour quels cas est-il recommandé d’utiliser les Route Handlers plutôt que les Server Actions ?",
    options: [
      "Pour les mutations internes dans un formulaire",
      "Pour exposer des APIs publiques RESTful",
      "Pour des appels directs dans les Server Components uniquement",
      "Pour écrire du code uniquement côté client",
    ],
    correctAnswer: 1,
  },
  {
    question: "Que fait la méthode NextResponse.json(data, { status: 201 }) ?",
    options: [
      "Envoie une réponse JSON avec un code HTTP 201 Created",
      "Crée un nouvel objet JSON côté client",
      "Définit une nouvelle route API",
      "Récupère des données JSON depuis la requête",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Quelle syntaxe permet de déclarer une variable tableau en mémoire dans un Route Handler pour simuler une base de données ?",
    options: [
      "let products = []",
      "const products = {}",
      "var products = null",
      "function products() {}",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Quelle est la bonne façon d’empêcher la mise en cache automatique d’une réponse dans un Route Handler ?",
    options: [
      "Ajouter l’en-tête Cache-Control: no-store",
      "Utiliser NextResponse.json(data, { cache: 'no-store' })",
      "Ne rien faire, Next.js ne cache pas les API par défaut",
      "Mettre revalidate: 3600",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Dans Next.js 15, comment tester facilement un Route Handler localement ?",
    options: [
      "Utiliser Postman ou curl pour envoyer des requêtes HTTP",
      "Lancer un serveur Node.js séparé",
      "Utiliser uniquement le navigateur sans outils",
      "Écrire un composant React pour appeler l’API",
    ],
    correctAnswer: 0,
  },
];
