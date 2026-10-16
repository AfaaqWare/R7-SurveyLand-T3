import type { SurveyStatus } from "@/modules/survey-response/types/survey";

export interface DateRange {
  from: Date;
  to: Date;
}

export type SurveyStatusCounts = Record<SurveyStatus, number>;

export interface LastMonthStats {
  totalSurveys: number;
  totalResponses: number;
  totalUsers: number;
  published: number;
  draft: number;
}
