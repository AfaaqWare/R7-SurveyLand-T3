import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Text from "@/shared/components/atoms/Text";
import StatusBadge from "@/shared/components/atoms/StatusBadge";
import { formatDate } from "@/shared/utils/formatDate";
import type { Survey } from "@/modules/survey-response/types/survey";
import type { RecentSurveyResponse } from "@/modules/responses/type/responses";
import type { RecentDataConfig, RecentDataView } from "../types/recentData";

export const surveyStats = [
  {
    id: "totalSurveys",
    title: "totalSurveys",
    variant: "teal" as const,
    icon: "clipboard" as const,
  },
  {
    id: "draft",
    title: "draftSurveys",
    variant: "orange" as const,
    icon: "clipboard" as const,
  },
  {
    id: "published",
    title: "publishedSurveys",
    variant: "green" as const,
    icon: "send" as const,
  },
  {
    id: "totalResponses",
    title: "responsesSurveys",
    variant: "purple" as const,
    icon: "chart" as const,
  },
  {
    id: "totalUsers",
    title: "totalUsers",
    variant: "blue" as const,
    icon: "users" as const,
  },
];
export const quickActions = [
  {
    id: "create-survey",
    name: "createSurvey",
    href: "/dashboard/create-survey",
    variant: "teal" as const,
    icon: "plus" as const,
    adminOnly: false,
  },
  {
    id: "manage-users",
    name: "manageUsers",
    href: "dashboard/users",
    variant: "green" as const,
    icon: "users" as const,
    adminOnly: true,
  },
  {
    id: "view-responses",
    name: "viewResponses",
    href: "/dashboard/responses",
    variant: "purple" as const,
    icon: "pieChart" as const,
    adminOnly: false,
  },
  {
    id: "export-reports",
    name: "exportReports",
    href: (surveyId: string) => `/dashboard/my-surveys/${surveyId}/export`,
    variant: "blue" as const,
    icon: "download" as const,
    adminOnly: false,
  },
];
export const surveyStatusItems = [
  {
    id: "draft" as const,
    labelKey: "draft" as const,
    color: "var(--color-status-draft)",
  },
  {
    id: "published" as const,
    labelKey: "published" as const,
    color: "var(--color-status-published)",
  },
  {
    id: "closed" as const,
    labelKey: "closed" as const,
    color: "var(--color-status-closed)",
  },
];
export const theme = {
  teal: {
    icon: "teal",
    background: "ds-bg-teal-soft",
    description: "teal",
  },
  orange: {
    icon: "orange",
    background: "ds-bg-orange-soft",
    description: "orange",
  },
  green: {
    icon: "green",
    background: "ds-bg-green-soft",
    description: "green",
  },
  purple: {
    icon: "purple",
    background: "ds-bg-purple-soft",
    description: "purple",
  },
  blue: {
    icon: "blue",
    background: "ds-bg-blue-soft",
    description: "blue",
  },
} as const;

interface RecentCellTextOptions {
  tableSize?: "xs" | "sm";
  tableClassName?: string;
}

const renderRecentCellText = (
  value: ReactNode,
  view: RecentDataView,
  { tableSize = "xs", tableClassName }: RecentCellTextOptions = {}
) => (
  <Text
    size={view === "table" ? tableSize : "sm"}
    className={cn(
      "!text-[var(--color-text-dash)]",
      view === "table" && ["font-semibold", tableClassName]
    )}
  >
    {value}
  </Text>
);

export const recentSurveysConfig: RecentDataConfig<Survey> = {
  titleKey: "recentSurveys",
  buttonLabelKey: "viewAll",
  href: "/dashboard/my-surveys",
  tableNamespace: "dashboard.home.recentSurveys.table",
  getKey: survey => survey.id,
  columns: [
    {
      id: "surveyTitle",
      labelKey: "surveyTitle",
      isTitle: true,
      render: survey => survey.title,
    },
    {
      id: "status",
      labelKey: "status",
      render: survey => (
        <StatusBadge
          className={`!rounded-lg ${survey.status === "closed" && "!bg-[#F4F5F7] dark:!bg-[#2C3039]"}`}
          status={survey.status}
        />
      ),
    },
    {
      id: "responses",
      labelKey: "responses",
      render: (survey, view) => renderRecentCellText(survey.responsesCount ?? 0, view),
    },
    {
      id: "updatedAt",
      labelKey: "updatedAt",
      render: (survey, view) => renderRecentCellText(formatDate(survey.updatedAt), view),
    },
  ],
};

export const recentResponsesConfig: RecentDataConfig<RecentSurveyResponse> = {
  titleKey: "recentResponses",
  buttonLabelKey: "viewAll",
  href: "/dashboard/responses",
  tableNamespace: "dashboard.home.responses.table",
  getKey: response => response.id,
  columns: [
    {
      id: "surveyTitle",
      labelKey: "surveyTitle",
      isTitle: true,
      render: response => response.surveyTitle || "No Title",
    },
    {
      id: "respondent",
      labelKey: "respondent",
      render: (response, view) =>
        renderRecentCellText(response.respondentName, view, {
          tableSize: "sm",
          tableClassName: "whitespace-nowrap",
        }),
    },
    {
      id: "responsePreview",
      labelKey: "responsePreview",
      wrap: true,
      render: (_, view) =>
        renderRecentCellText("very satisfied", view, {
          tableClassName: "max-w-[250px] truncate",
        }),
    },
    {
      id: "submittedAt",
      labelKey: "submittedAt",
      render: (response, view) =>
        renderRecentCellText(formatDate(response.submittedAt), view, {
          tableClassName: "whitespace-nowrap",
        }),
    },
  ],
};
