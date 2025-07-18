export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LuxiDev",
  description:
    "Apprends le développement web moderne gratuitement, avec une stack professionnelle.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Cours",
      href: "/courses",
    },
    {
      label: "À propos",
      href: "/about",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Mon profil",
      href: "/profile",
    },
    {
      label: "Tableau de bord",
      href: "/dashboard",
    },
    {
      label: "Mes cours",
      href: "/my-courses",
    },
    {
      label: "Paramètres",
      href: "/settings",
    },
    {
      label: "Support",
      href: "/help",
    },
    {
      label: "Déconnexion",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/konanAlex/luxidev", // ou ton GitHub
    twitter: "https://twitter.com/luxi_dev", // ou perso
    docs: "https://luxidev.com/docs", // ou future doc
    discord: "https://discord.gg/tonserveur", // optionnel
    sponsor: "https://www.buymeacoffee.com/luxidev", // si tu veux des soutiens
  },
};
