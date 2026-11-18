"use client";
import React from "react";
import StatsCard from "../molecules/StatsCard";
import StatsCardSkeleton from "../molecules/StatsCardSkeleton";
import useLastMonthStats from "../../hooks/useLastMonthStats";
import { useTranslations } from "next-intl";

type StatsIcon = "clipboard" | "send" | "chart" | "users";

interface SurveyStat {
  id: string;
  title: string;
  variant: "teal" | "orange" | "green" | "purple" | "blue";
  icon: StatsIcon;
}

const SOURCE_BY_STAT_ID: Record<string, "surveys" | "responses" | "users"> = {
  totalSurveys: "surveys",
  published: "surveys",
  draft: "surveys",
  totalResponses: "responses",
  totalUsers: "users",
};

interface SurveyStatsSectionProps {
  stats: SurveyStat[];
  className?: string;
}

export default function SurveyStatsSection({ stats, className }: SurveyStatsSectionProps) {
  const t = useTranslations();

  const { stats: lastMonthStats, sources } = useLastMonthStats();

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
        {stats.map(stat => {
          const source = sources[SOURCE_BY_STAT_ID[stat.id]];

          if (source.isLoading) {
            return <StatsCardSkeleton key={stat.id} />;
          }

          return (
            <StatsCard
              key={stat.id}
              variant={stat.variant}
              icon={stat.icon}
              title={stat.title}
              value={source.isError ? "—" : resultState[stat.id]}
              description={t("dashboard.home.stats.fromLastMonth")}
            />
          );
        })}
      </div>
    </section>
  );
}
