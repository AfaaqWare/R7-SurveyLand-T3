import { Survey } from "../types/survey";
import {
  Eye,
  Pencil,
  Send,
  Link2,
  Trash2,
  PanelLeftOpen,
  ClipboardList,
  PieChart,
  Clock3,
  CalendarDays,
} from "@/assets/icons/icons";
import { formatDate } from "@/shared/utils/formatDate";
import { formatRelativeTime } from "@/shared/utils/formatRelativeTime";
import type { BadgeTone } from "@/shared/components/atoms/Badge";
export const mockSurvey: Survey = {
  id: "survey-1",

  userId: "user-1",

  title: "Frontend Training Survey",

  description: "Help us improve the training experience.",

  cover: "/images/responseHeroImg.jpg",

  deadline: "10 May 2026",

  status: "draft",

  link: null,

  createdAt: "2026-01-10T00:00:00.000Z",

  updatedAt: "2026-01-10T00:00:00.000Z",

  lastMilestone: 0,

  questions: [
    {
      qid: "q1",
      type: "mcq",
      questionText: "What's your favorite language?",
      isRequired: true,
      choices: ["JavaScript", "Python", "Go"],
    },

    {
      qid: "q2",
      type: "textarea",
      questionText: "ما اسمك ؟",
      isRequired: true,
      choices: null,
    },

    {
      qid: "q3",
      type: "textarea",
      questionText: "ما رأيك في التدريب ؟",
      isRequired: true,
      choices: null,
    },
  ],
};

interface SurveyCardAction {
  id: string;
  labelKey: string;
  icon: typeof Eye;
  href?: (surveyId: string) => string;
  hrefSuffix?: string;
  muted: boolean;
  variant: "outline" | "primary";
}

export const surveyCardActions: SurveyCardAction[] = [
  {
    id: "preview",
    labelKey: "preview",
    icon: Eye,
    href: surveyId => `my-surveys/${surveyId}/preview`,
    muted: true,
    variant: "outline",
  },
  {
    id: "edit",
    labelKey: "edit",
    icon: Pencil,
    href: surveyId => `/dashboard/my-surveys/${surveyId}/edit`,
    muted: false,
    variant: "outline",
  },
  {
    id: "details",
    labelKey: "details",
    icon: PanelLeftOpen,
    hrefSuffix: "",
    muted: false,
    variant: "primary",
  },
];

interface SurveyCardMenuItem {
  id: "preview" | "edit" | "publish" | "copyLink" | "delete";
  labelKey: string;
  icon: typeof Eye;
  kind: "link" | "action";
  href?: (surveyId: string) => string;
  hrefSuffix?: string;
  danger?: boolean;
}

export const surveyCardMenuItems: SurveyCardMenuItem[] = [
  {
    id: "preview",
    labelKey: "preview",
    icon: Eye,
    kind: "link",
    href: surveyId => `my-surveys/${surveyId}/preview`,
  },
  { id: "edit", labelKey: "edit", icon: Pencil, kind: "link", hrefSuffix: "/edit" },
  { id: "publish", labelKey: "publish", icon: Send, kind: "action" },
  { id: "copyLink", labelKey: "copyLink", icon: Link2, kind: "action" },
  { id: "delete", labelKey: "delete", icon: Trash2, kind: "action", danger: true },
];

export const surveyCardMetaFields = [
  {
    id: "questions",
    icon: ClipboardList,
    labelKey: "questionsCount",
    getValues: (survey: Survey) => ({ count: survey.questions?.length ?? 0 }),
  },
  {
    id: "responses",
    icon: PieChart,
    labelKey: "responses",
    getValues: (survey: Survey) => ({ count: survey.responsesCount ?? 0 }),
  },
  {
    id: "deadline",
    icon: CalendarDays,
    labelKey: "deadline",
    getValues: (survey: Survey, locale: string) => ({
      date: formatDate(survey.deadline, locale),
    }),
  },
  {
    id: "updated",
    icon: Clock3,
    labelKey: "updated",
    getValues: (survey: Survey, locale: string) => ({
      time: formatRelativeTime(survey.updatedAt, locale),
    }),
  },
] as const;

export const RESPONSES_PREVIEW_ROW_LIMIT = 5;

interface ResponsesPreviewContext {
  survey: Survey;
  responsesCount: number;
}

interface ResponsesPreviewBadge {
  id: "showingRows" | "questions" | "responses";
  tone: BadgeTone;
  labelKey: string;
  getValues: (ctx: ResponsesPreviewContext) => Record<string, number>;
}

export const responsesPreviewBadges: ResponsesPreviewBadge[] = [
  {
    id: "showingRows",
    tone: "gray",
    labelKey: "showingFirstRows",
    getValues: () => ({ count: RESPONSES_PREVIEW_ROW_LIMIT }),
  },
  {
    id: "questions",
    tone: "green",
    labelKey: "questionsCount",
    getValues: ({ survey }) => ({ count: survey.questions?.length ?? 0 }),
  },
  {
    id: "responses",
    tone: "orange",
    labelKey: "responsesCount",
    getValues: ({ responsesCount }) => ({ count: responsesCount }),
  },
];

export interface ExportSettingOption {
  id: "respondentName" | "respondentEmail" | "submissionData" | "answers";
  labelKey: string;
}

export const exportSettingsOptions: ExportSettingOption[] = [
  { id: "respondentName", labelKey: "respondentName" },
  { id: "respondentEmail", labelKey: "respondentEmail" },
  { id: "submissionData", labelKey: "submissionData" },
  { id: "answers", labelKey: "answers" },
];
