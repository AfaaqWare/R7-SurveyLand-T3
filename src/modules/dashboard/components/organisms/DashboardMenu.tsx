"use client";

import SidebarSection from "../molecules/SidebarSection";
import {
  Users,
  ShieldCheck,
  ClipboardList,
  FilePenLine,
  Send,
  LockKeyhole,
  PieChart,
  User,
  LogOut,
} from "lucide-react";
import { group } from "@/assets/images/images";
import Image from "next/image";
import Link from "next/link";
import { useLogoutHandler } from "@/modules/auth/hooks/useLogoutHandler";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import useSurveyStatus from "@/modules/survey-response/hooks/useSurveyStatus";

interface DashboardMenuProps {
  collapsed: boolean;
}

export default function DashboardMenu({ collapsed }: DashboardMenuProps) {
  const { handleLogout, isPending } = useLogoutHandler();
  const pathname = usePathname();

  const isDashboardActive = pathname === "/dashboard";

  const { status, handleStatusChange } = useSurveyStatus();

  const isSurveyPage = pathname.startsWith("/dashboard/my-surveys");

  return (
    <nav className="my-6 flex h-full w-full flex-1 flex-col gap-6 text-left">
      <Link
        href="/dashboard"
        className={cn(
          "flex w-full items-center gap-3 rounded-xl py-3 transition-colors",
          collapsed ? "justify-center px-0" : "pl-6",
          isDashboardActive
            ? "bg-[var(--color-primary-200)] text-[var(--color-primary)] dark:bg-[color-mix(in_srgb,var(--color-primary-200)_40%,transparent)]"
            : "ds-text-primary hover:bg-[var(--color-primary-200)] hover:text-[var(--color-primary)] dark:hover:bg-[color-mix(in_srgb,var(--color-primary-200)_25%,transparent)]"
        )}
      >
        <Image src={group} alt="Dashboard" width={20} height={20} />
        {!collapsed && <h4 className="font-semibold">Dashboard</h4>}
      </Link>
      <hr className="border-0 border-t border-[var(--border-color)]" />
      <SidebarSection
        collapsed={collapsed}
        title="User Management"
        items={[
          {
            label: "All Users",
            icon: <Users size={22} />,
            href: "/dashboard/users",
          },
          {
            label: "Roles & Permission",
            icon: <ShieldCheck size={22} />,
            href: "/dashboard/users",
          },
        ]}
      />

      <SidebarSection
        collapsed={collapsed}
        title="Survey Management"
        items={[
          {
            label: "All Surveys",
            icon: <ClipboardList size={22} />,
            isActive: isSurveyPage && status === "all",
            onClick: () => handleStatusChange("all"),
          },
          {
            label: "Draft Surveys",
            icon: <FilePenLine size={22} />,
            isActive: isSurveyPage && status === "draft",
            onClick: () => handleStatusChange("draft"),
          },
          {
            label: "Published Surveys",
            icon: <Send size={22} />,
            isActive: isSurveyPage && status === "published",
            onClick: () => handleStatusChange("published"),
          },
          {
            label: "Closed Surveys",
            icon: <LockKeyhole size={22} />,
            isActive: isSurveyPage && status === "closed",
            onClick: () => handleStatusChange("closed"),
          },
        ]}
      />
      <SidebarSection
        collapsed={collapsed}
        title="Response Management"
        items={[
          {
            label: "Responses",
            icon: <PieChart size={22} />,
            href: "/dashboard/responses",
          },
        ]}
      />
      <div className="mt-auto border-t border-[var(--border-color)] pt-6">
        <SidebarSection
          collapsed={collapsed}
          title="Others"
          items={[
            {
              label: "Profile",
              icon: <User size={22} />,
              href: "/edit-profile",
            },
            {
              label: isPending ? "Logging out..." : "Log out",
              icon: <LogOut size={22} />,
              danger: true,
              onClick: handleLogout,
            },
          ]}
        />
      </div>
    </nav>
  );
}
