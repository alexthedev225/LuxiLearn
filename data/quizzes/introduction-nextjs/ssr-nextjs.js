export default [
  {
    question: "Quelle méthode remplace getServerSideProps dans App Router ?",
    options: [
      "fetch avec cache: 'no-store'",
      "useEffect",
      "getStaticProps",
      "getInitialProps",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Dans l’App Router, comment accède-t-on aux paramètres dynamiques passés dans une page SSR ?",
    options: [
      "Via useParams() côté client",
      "En important useRouter depuis 'next/router'",
      "En destructurant la promesse params reçue en props avec await",
      "Ils ne sont pas accessibles dans App Router",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Que signifie l’option cache: 'no-store' utilisée avec fetch dans un Server Component ?",
    options: [
      "Met en cache la réponse pour un rendu statique",
      "Force à récupérer les données à chaque requête côté serveur (SSR)",
      "Utilisé uniquement pour les Client Components",
      "Active la mise en cache côté client uniquement",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Quel type de composant exécute-t-on par défaut dans le dossier app/ de Next.js 15 ?",
    options: [
      "Client Components",
      "Server Components",
      "Components React Native",
      "Composants statiques uniquement",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Pour quoi utilise-t-on l'instruction 'use client' dans Next.js 15 App Router ?",
    options: [
      "Pour marquer un composant comme exécuté côté serveur",
      "Pour activer les hooks React et l'interactivité côté client",
      "Pour forcer le rendu statique",
      "Pour définir une route API",
    ],
    correctAnswer: 1,
  },
];
