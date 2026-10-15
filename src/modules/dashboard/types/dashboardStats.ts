import type { SurveyStatus } from "@/modules/survey-response/types/survey";

export interface DateRange {
  from: Date;
  to: Date;
}

export type SurveyStatusCounts = Record<SurveyStatus, number>;
