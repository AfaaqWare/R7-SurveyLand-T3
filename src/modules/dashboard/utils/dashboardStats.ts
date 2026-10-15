import type { Survey, SurveyStatus } from "@/modules/survey-response/types/survey";
import type { DateRange, SurveyStatusCounts } from "../types/dashboardStats";

export const RECENT_ITEMS_LIMIT = 4;
export const DASHBOARD_SURVEYS_PAGE = 1;
export const DASHBOARD_SURVEYS_PAGE_SIZE = 100;

export function getLastMonthRange(now: Date = new Date()): DateRange {
  const from = new Date(now);
  from.setMonth(now.getMonth() - 1);

  return { from, to: now };
}

export function countByStatus(surveys: Survey[]): SurveyStatusCounts {
  const counts: SurveyStatusCounts = { draft: 0, published: 0, closed: 0 };

  for (const survey of surveys) {
    const status = survey.status.toLowerCase() as SurveyStatus;

    if (status in counts) {
      counts[status] += 1;
    }
  }

  return counts;
}
