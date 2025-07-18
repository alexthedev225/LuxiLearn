// layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { HighlightThemeLoader } from "./HighlightThemeLoader";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "LuxiLearn",
    template: "%s - LuxiLearn",
  },
  description:
    "LuxiLearn : Plateforme e-learning gratuite pour maîtriser le développement web moderne avec Next.js, React, TypeScript et plus, sans inscription.",
  keywords: [
    "e-learning",
    "développement web",
    "Next.js",
    "React",
    "TypeScript",
    "gratuit",
  ],
  authors: [{ name: "LuxiLearn Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "LuxiLearn - Apprends le Développement Web Gratuitement",
    description:
      "Rejoins LuxiLearn pour des cours pratiques sur Next.js, React, TypeScript et plus, 100% gratuits et sans inscription.",
    url: "https://luxilearn.com",
    siteName: "LuxiLearn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lux Hayek - Plateforme e-learning gratuite",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxiLearn - Développement Web Gratuit",
    description:
      "Apprends le développement web moderne avec des cours gratuits sur LuxiLearn.",
    images: ["/og-image.jpg"],
    creator: "@luxilearn",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fr">
      <body
        className={clsx(
          "min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main
              className="flex-grow"
              role="main"
              aria-label="Contenu principal de LuxiLearn"
            >
              {children}
              <HighlightThemeLoader />
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
