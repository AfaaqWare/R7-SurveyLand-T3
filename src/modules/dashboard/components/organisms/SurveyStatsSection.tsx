"use client";
import React from "react";
import StatsCard from "../molecules/StatsCard";
import SurveyStatsSectionSkeleton from "./SurveyStatsSectionSkeleton";
import useLastMonthStats from "../../hooks/useLastMonthStats";
import { useTranslations } from "next-intl";

type StatsIcon = "clipboard" | "send" | "chart" | "users";

interface SurveyStat {
  id: string;
  title: string;
  variant: "teal" | "orange" | "green" | "purple" | "blue";
  icon: StatsIcon;
}

interface SurveyStatsSectionProps {
  stats: SurveyStat[];
  className?: string;
}

export default function SurveyStatsSection({ stats, className }: SurveyStatsSectionProps) {
  const t = useTranslations();

  const { stats: lastMonthStats, isLoading: loadingLastMonthStats } = useLastMonthStats();

  if (loadingLastMonthStats) {
    return <SurveyStatsSectionSkeleton className={className} />;
  }

  const resultState: Record<string, number> = {
    totalSurveys: lastMonthStats.totalSurveys,
    totalResponses: lastMonthStats.totalResponses,
    totalUsers: lastMonthStats.totalUsers,
    published: lastMonthStats.published,
    draft: lastMonthStats.draft,
  };

  return (
    <section className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {stats.map(stat => (
          <StatsCard
            key={stat.id}
            variant={stat.variant}
            icon={stat.icon}
            title={stat.title}
            value={resultState[stat.id]}
            description={t("dashboard.home.stats.fromLastMonth")}
          />
        ))}
      </div>
    </section>
  );
}
