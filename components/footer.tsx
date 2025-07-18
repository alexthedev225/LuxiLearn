"use client";

import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { GithubIcon, TwitterIcon, DiscordIcon } from "@/components/icons";
import { link as linkStyles } from "@heroui/theme";

export const Footer = () => {
  return (
    <footer className="bg-background sm:border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Logo & copyright */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <NextLink href="/" className="flex items-center gap-2">
            <span className="font-bold text-danger">LuxiLearn</span>
          </NextLink>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LuxiLearn. Gratuit & open-source.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 flex-wrap justify-center">
          {siteConfig.navItems
            .filter((item) =>
              ["/", "/courses", "/about", "/contact"].includes(item.href)
            )
            .map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium hover:text-danger transition-colors",
                  linkStyles({ color: "foreground" })
                )}
              >
                {item.label}
              </NextLink>
            ))}
        </nav>

        {/* Social links */}
        <div className="flex gap-4">
          <Link
            isExternal
            href={siteConfig.links.github}
            aria-label="GitHub de LuxiLearn"
            className="text-muted-foreground hover:text-danger transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.twitter}
            aria-label="Twitter de LuxiLearn"
            className="text-muted-foreground hover:text-danger transition-colors"
          >
            <TwitterIcon className="w-5 h-5" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.discord}
            aria-label="Discord de LuxiLearn"
            className="text-muted-foreground hover:text-danger transition-colors"
          >
            <DiscordIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
