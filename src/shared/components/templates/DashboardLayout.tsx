"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardNavbar from "../organisms/DashboardNavbar";
import { cn } from "@/lib/cn";
import AdminSidebar from "@/modules/dashboard/components/organisms/AdminSidebar";
import UserSidebar from "@/modules/dashboard/components/organisms/UserSidebar";
import useGetProfile from "@/modules/auth/hooks/useGetProfile";

const ADMIN_ROUTES = ["/dashboard/users", "/dashboard/edit-role"];

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useGetProfile();
  const isAdmin = data?.role === "ADMIN";

  const isAdminRoute =
    data && ADMIN_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));

  useEffect(() => {
    if (data && !isAdmin && isAdminRoute) {
      router.replace("/dashboard");
    }
  }, [data, isAdmin, isAdminRoute, router]);

  if (data && !isAdmin && isAdminRoute) {
    return null;
  }

  const Sidebar = isAdmin ? AdminSidebar : UserSidebar;

  return (
    <div className="min-h-screen">
      <DashboardNavbar />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-hidden border-r border-[var(--border-color)] bg-[var(--color-bg-alt)] py-6 transition-[width] duration-300 md:block",
            sidebarCollapsed ? "w-20" : "w-64"
          )}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(c => !c)}
          />
        </aside>

        <main className="ds-container mx-auto min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
