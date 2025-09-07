"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname() ?? "";
  const isAdminRoute = pathname.startsWith("/admin");

  // Estimation de la hauteur de la navbar : ~64px (4rem)
  const navbarHeight = "4rem";

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main style={{ paddingTop: !isAdminRoute ? navbarHeight : 0 }}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
