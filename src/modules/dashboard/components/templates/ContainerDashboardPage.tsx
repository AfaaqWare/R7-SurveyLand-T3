"use client";
import React from "react";
import SurveyStatsSection from "@/modules/dashboard/components/organisms/SurveyStatsSection";
import SurveyStatusSection from "@/modules/dashboard/components/molecules/SurveyStatusSection";
import RecentSurveysSection from "@/modules/dashboard/components/organisms/RecentSurveysSection";
import RecentResponsesSection from "@/modules/dashboard/components/molecules/RecentResponsesSection";
import QuickActionsSection from "@/modules/dashboard/components/organisms/QuickActionsSection";
import { surveyStats } from "@/modules/dashboard/utils/data";
import Heading from "@/modules/dashboard/components/molecules/Heading";
import useDashboardStats from "@/modules/dashboard/hooks/useDashboardStats";
import useGetProfile from "@/modules/auth/hooks/useGetProfile";
import { useTranslations } from "next-intl";

export default function ContainerDashboardPage() {
  const t = useTranslations("dashboard.home.stats.chart");
  const { data: profile } = useGetProfile();
  const name = profile?.name?.trim().split(/\s+/)[0];
  const {
    recentSurveys,
    recentResponses,
    totalClosedSurveys,
    totalDraftSurveys,
    totalPublishedSurveys,
    loadingRecentSurveys,
    errorRecentSurveys,
    loadingRecentResponses,
    errorRecentResponses,
  } = useDashboardStats();
  const statusData = [
    {
      id: "draft" as const,
      label: t("draft"),
      value: totalDraftSurveys,
      color: "var(--color-status-draft)",
    },
    {
      id: "published" as const,
      label: t("published"),
      value: totalPublishedSurveys,
      color: "var(--color-status-published)",
    },
    {
      id: "closed" as const,
      label: t("closed"),
      value: totalClosedSurveys,
      color: "var(--color-status-closed)",
    },
  ];
  return (
    <main>
      <Heading name={String(name ?? "loading...")} />

      <SurveyStatsSection stats={surveyStats} />
      <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
        <SurveyStatusSection data={statusData} isLoading={loadingRecentSurveys} />
        <RecentSurveysSection
          surveys={recentSurveys}
          isError={errorRecentSurveys}
          isLoading={loadingRecentSurveys}
        />
      </div>
      <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <RecentResponsesSection
          responses={recentResponses}
          isError={errorRecentResponses}
          isLoading={loadingRecentResponses}
        />
        <SurveyStatusSection data={statusData} isLoading={loadingRecentSurveys} />
      </div>
      <QuickActionsSection />
    </main>
  );
}
