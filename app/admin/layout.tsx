// app/admin/layout.tsx
import { ReactNode } from "react";
import AdminShell from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin | LuxiLearn",
  description: "Interface d'administration de la plateforme LuxiLearn.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
