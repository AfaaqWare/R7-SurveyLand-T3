"use client";

import { useTranslations } from "next-intl";
import IconInput from "@/shared/components/molecules/IconInput";
import { Search } from "@/assets/icons/icons";
import SurveyStatusTabs, { type SurveyStatusFilter } from "../molecules/SurveyStatusTabs";
import SurveySortSelect, { type SurveysSortOrder } from "../molecules/SurveySortSelect";

interface SurveysToolbarProps {
  status: SurveyStatusFilter;
  onStatusChange: (status: SurveyStatusFilter) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sort: SurveysSortOrder;
  onSortChange: (sort: SurveysSortOrder) => void;
}

export default function SurveysToolbar({
  status,
  onStatusChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}: SurveysToolbarProps) {
  const t = useTranslations("dashboard.surveys.filters");

  return (
    <div className="mt-10 mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <SurveyStatusTabs value={status} onChange={onStatusChange} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <IconInput
          icon={<Search size={18} />}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchLabel")}
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          className="!border-[var(--border-color-card)] !bg-[var(--color-bg-card)] sm:w-64"
        />

        <SurveySortSelect value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
