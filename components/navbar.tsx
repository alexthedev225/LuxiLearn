"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import LinkNext from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";
import React from "react";

export const Navbar = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/");

  // Detect scroll for navbar background blur effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchInput = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Input
        aria-label="Rechercher un cours"
        classNames={{
          inputWrapper: clsx(
            "bg-background/60 backdrop-blur-md border border-divider/30",
            "hover:bg-background/80 hover:border-primary/30 transition-all duration-300",
            "focus-within:bg-background/90 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/20"
          ),
          input: "text-sm text-foreground placeholder:text-muted-foreground",
        }}
        endContent={
          <div className="flex items-center gap-2">
            <Kbd
              className="hidden lg:inline-block bg-muted/50 text-xs"
              keys={["command"]}
            >
              K
            </Kbd>
          </div>
        }
        placeholder="Rechercher des cours..."
        startContent={
          <SearchIcon className="text-muted-foreground group-focus-within:text-primary transition-colors" />
        }
        type="search"
        variant="flat"
        radius="full"
      />
    </motion.div>
  );

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/courses", label: "Cours" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];



  return (
    <HeroUINavbar
      isBordered={false}
      position="sticky"
      maxWidth="xl"
      className={clsx(
        "transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-divider/30"
          : "bg-background/95 backdrop-blur-lg"
      )}
      classNames={{
        wrapper: "px-4 sm:px-6 lg:px-8",
        base: "backdrop-blur-xl",
      }}
    >
      {/* Brand + Navigation Desktop */}
      <NavbarContent justify="start" className="basis-1/3">
        <NavbarBrand as="li">
          <LinkNext href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LuxiLearn
            </span>
          </LinkNext>
        </NavbarBrand>

        {/* Navigation Links Desktop */}
        <ul className="hidden lg:flex gap-2 ml-8">
          {navItems.map((item) => (
            <NavbarItem
              as={motion.li}
              key={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkNext
                href={item.href}
                className={clsx(
                  "relative px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group",
                  activeItem === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:underline-offset-2"
                )}
                onClick={() => setActiveItem(item.href)}
              >
                <span className="relative">
                  {item.label}
                  {activeItem === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </span>
              </LinkNext>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Search & Actions */}
      <NavbarContent justify="end" className="basis-1/3 items-center gap-3">
        {/* Search Input Desktop */}
        <NavbarItem className="hidden lg:flex w-[300px]">
          {searchInput}
        </NavbarItem>

        {/* Actions Desktop */}
        <NavbarItem className="hidden sm:flex items-center gap-3">
          {/* Theme Switch */}
          <ThemeSwitch />
        </NavbarItem>

        {/* Mobile Search Toggle */}
        <NavbarItem className="sm:hidden">
          <Button
            variant="light"
            size="sm"
            onPress={() => setSearchOpen(!searchOpen)}
            aria-label="Afficher la recherche"
            className="text-muted-foreground hover:text-primary transition-colors"
            isIconOnly
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
        </NavbarItem>

        {/* Mobile Menu Toggle */}
        <NavbarContent justify="end" className="sm:hidden basis-auto pl-2">
          <NavbarMenuToggle className="text-foreground hover:text-primary transition-colors" />
        </NavbarContent>
      </NavbarContent>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden px-4 pb-4"
          >
            {searchInput}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-background/95 backdrop-blur-xl border-divider/30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 px-4 py-6"
        >
          {/* Mobile Navigation */}
          <div className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              >
                <NavbarMenuItem>
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200",
                      activeItem === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                </NavbarMenuItem>
              </motion.div>
            ))}
          </div>

          {/* Mobile Theme Switch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/20"
          >
            <span className="font-medium text-foreground">Thème</span>
            <ThemeSwitch />
          </motion.div>

          {/* Mobile Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-muted/20"
          >
            <span className="font-medium text-foreground">Suivez-nous</span>
            <div className="flex gap-3">
              <Link
                isExternal
                aria-label="GitHub LuxiLearn"
                href={siteConfig.links.github}
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link
                isExternal
                aria-label="Discord LuxiLearn"
                href={siteConfig.links.discord}
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              >
                <DiscordIcon className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
