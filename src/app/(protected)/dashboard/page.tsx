import React from "react";
import { buildSeo } from "@/core/seo/Seo";
import ContainerDashboardPage from "@/modules/dashboard/components/templates/ContainerDashboardPage";
export const metadata = buildSeo({
  title: "Dashboard - Afaaq Ware",
  description: "User dashboard to manage profile and activities",
  noIndex: true,
});

export default function DashboardPage() {
  return <ContainerDashboardPage />;
}
