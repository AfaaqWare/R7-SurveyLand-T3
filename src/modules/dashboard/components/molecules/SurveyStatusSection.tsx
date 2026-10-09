import React from "react";
import { CircleHelp, Users } from "@/assets/icons/icons";
import { Pie, PieChart, Cell } from "recharts";
import { cn } from "@/lib/cn";
import Text from "@/shared/components/atoms/Text";
import Title from "@/shared/components/atoms/Title";
import Icon from "@/shared/components/atoms/Icon";
import { ChartConfig, ChartContainer } from "./Chart";
import { useTranslations } from "next-intl";
import { Survey } from "@/modules/survey-response/types/survey";
import SurveyStatusSectionSkeleton from "./SurveyStatusSectionSkeleton";
interface SurveyStatus {
  id: Survey["status"];
  label: string;
  value: number;
  color: string;
}
interface SurveyStatusSectionProps {
  data?: SurveyStatus[];
  total?: number;
  isIcon?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function SurveyStatusSection({
  data = [],
  total,
  isIcon = false,
  isLoading = false,
  className,
}: SurveyStatusSectionProps) {
  const t = useTranslations("dashboard.home");

  if (isLoading) {
    return <SurveyStatusSectionSkeleton className={className} />;
  }
  const chartConfig = {
    draft: {
      label: "Draft",
      color: "var(--color-status-draft)",
    },
    published: {
      label: "Published",
      color: "var(--color-status-published)",
    },
    closed: {
      label: "Closed",
      color: "var(--color-status-closed)",
    },
  } satisfies ChartConfig;

  const calculatedTotal = total ?? data.reduce((sum, item) => sum + item.value, 0);
  return (
    <section className={cn("ds-bg-card ds-rounded-2xl p-7", "w-full", className)}>
      <div className="flex items-center justify-between">
        <Title size="sm" className="font-bold !text-[var(--color-text-dash-secondary)]">
          {t("sections.surveyStatusOverview")}
        </Title>

        <Icon size="xs" IconComponent={CircleHelp} variant="disabled" />
      </div>

      <div
        className={cn(
          "mt-13 flex w-full items-center justify-center",
          "flex-col gap-6",
          "sm:flex-row"
        )}
      >
        {/* Donut Chart */}
        <div className="relative flex w-full justify-center lg:w-1/2">
          <ChartContainer config={chartConfig} className="h-[160px] w-full max-w-[160px]">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={0}
                strokeWidth={0}
                isAnimationActive
              >
                {data.map(item => (
                  <Cell key={item.id} fill={item.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {isIcon ? (
              <Icon IconComponent={Users} size="md" variant="primary" />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Text size="xs" variant="disabled" className="!text-[10px]">
                  {t("chart.total")}
                </Text>

                <Title size="sm" className="!text-[10px] font-bold !text-[var(--color-text-dash)]">
                  {calculatedTotal}
                </Title>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex w-full max-w-[250px] flex-col gap-5 lg:w-1/2">
          {data.map(item => {
            const percentage = calculatedTotal > 0 ? (item.value / calculatedTotal) * 100 : 0;

            return (
              <div
                key={item.id}
                className="grid grid-cols-[.5rem_minmax(50px,1fr)_30px_50px] items-center gap-1"
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <Title
                  variant="primary"
                  className="!text-[10px] !font-semibold !text-[var(--color-text-dash)]"
                >
                  {item.label}
                </Title>

                <Title className="!text-[10px] !font-semibold !text-[var(--color-text-dash)]">
                  {item.value}
                </Title>

                <Text variant="disabled" className="!text-[10px]">
                  {percentage.toFixed(1)}%
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
