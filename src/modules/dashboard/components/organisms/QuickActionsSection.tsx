"use client";

import Title from "@/shared/components/atoms/Title";
import { quickActions } from "../../utils/data";
import QuickActionCard from "../molecules/QuickActionCard";
import QuickActionCardSkeleton from "../molecules/QuickActionCardSkeleton";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import useGetProfile from "@/modules/auth/hooks/useGetProfile";
import useDashboardStats from "../../hooks/useDashboardStats";

export default function QuickActionsSection() {
  const t = useTranslations("dashboard.home.quickActions");
  const { data } = useGetProfile();
  const isAdmin = data?.role === "ADMIN";
  const { recentSurveys, loadingRecentSurveys } = useDashboardStats();
  const latestSurveyId = recentSurveys?.[0]?.id;

  const visibleActions = quickActions.filter(action => !action.adminOnly || isAdmin);

  return (
    <section className="ds-rounded-lg ds-bg-card w-full p-4 md:p-6 lg:p-10">
      <Title size="sm" className="font-bold !text-[var(--color-text-dash-secondary)]">
        {t("title")}
      </Title>

      <div
        className={cn(
          "mt-10",
          "grid w-full gap-5",
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          isAdmin && "lg:grid-cols-4"
        )}
      >
        {visibleActions.map(action => {
          if (typeof action.href === "function") {
            if (loadingRecentSurveys) {
              return <QuickActionCardSkeleton key={action.id} />;
            }

            if (!latestSurveyId) {
              return null;
            }

            return (
              <QuickActionCard
                key={action.id}
                icon={action.icon}
                name={action.name}
                variant={action.variant}
                href={action.href(latestSurveyId)}
              />
            );
          }

          return (
            <QuickActionCard
              key={action.id}
              icon={action.icon}
              name={action.name}
              variant={action.variant}
              href={action.href}
            />
          );
        })}
      </div>
    </section>
  );
}
