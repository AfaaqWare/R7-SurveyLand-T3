"use client";
import React from "react";
import SurveyStatsSection from "@/modules/dashboard/components/organisms/SurveyStatsSection";
import SurveyStatusSection from "@/modules/dashboard/components/molecules/SurveyStatusSection";
import RecentSurveysSection from "@/modules/dashboard/components/organisms/RecentSurveysSection";
import RecentResponsesSection from "@/modules/dashboard/components/molecules/RecentResponsesSection";
import QuickActionsSection from "@/modules/dashboard/components/organisms/QuickActionsSection";
import { surveyStats, surveyStatusItems } from "@/modules/dashboard/utils/data";
import Heading from "@/modules/dashboard/components/molecules/Heading";
import useSurveyStatusCounts from "@/modules/dashboard/hooks/useSurveyStatusCounts";
import useRecentSurveys from "@/modules/dashboard/hooks/useRecentSurveys";
import useRecentResponses from "@/modules/dashboard/hooks/useRecentResponses";
import useGetProfile from "@/modules/auth/hooks/useGetProfile";
import { useTranslations } from "next-intl";

export default function ContainerDashboardPage() {
  const t = useTranslations("dashboard.home.stats.chart");
  const { data: profile } = useGetProfile();
  const name = profile?.name?.trim().split(/\s+/)[0];

  const { counts: statusCounts, isLoading: loadingStatusCounts } = useSurveyStatusCounts();
  const {
    recentSurveys: latestSurveys,
    isLoading: loadingLatestSurveys,
    isError: errorLatestSurveys,
  } = useRecentSurveys();
  const {
    recentResponses: latestResponses,
    isLoading: loadingLatestResponses,
    isError: errorLatestResponses,
  } = useRecentResponses();

  const surveyStatusData = surveyStatusItems.map(item => ({
    id: item.id,
    label: t(item.labelKey),
    value: statusCounts[item.id],
    color: item.color,
  }));
  return (
    <main>
      <Heading name={String(name ?? "loading...")} />

      <SurveyStatsSection stats={surveyStats} />
      <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
        <SurveyStatusSection data={surveyStatusData} isLoading={loadingStatusCounts} />
        <RecentSurveysSection
          surveys={latestSurveys}
          isError={errorLatestSurveys}
          isLoading={loadingLatestSurveys}
        />
      </div>
      <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <RecentResponsesSection
          responses={latestResponses}
          isError={errorLatestResponses}
          isLoading={loadingLatestResponses}
        />
        <SurveyStatusSection data={surveyStatusData} isLoading={loadingStatusCounts} />
      </div>
      <QuickActionsSection />
    </main>
  );
}
