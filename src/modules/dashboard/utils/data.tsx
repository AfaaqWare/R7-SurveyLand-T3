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
