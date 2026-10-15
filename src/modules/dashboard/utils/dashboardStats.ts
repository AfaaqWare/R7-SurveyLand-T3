import type { Survey, SurveyStatus } from "@/modules/survey-response/types/survey";
import type { SurveyResponse } from "@/modules/responses/type/responses";
import type { AdminUser } from "../types/AdminUser";
import type { DateRange, LastMonthStats, SurveyStatusCounts } from "../types/dashboardStats";

interface LastMonthStatsInput {
  surveys: Survey[];
  responses: SurveyResponse[];
  users: AdminUser[];
  range: DateRange;
}
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

function isWithinRange(dateString: string, range: DateRange): boolean {
  const time = new Date(dateString).getTime();

  return time >= range.from.getTime() && time <= range.to.getTime();
}

export function getLastMonthStats({
  surveys,
  responses,
  users,
  range,
}: LastMonthStatsInput): LastMonthStats {
  const stats: LastMonthStats = {
    totalSurveys: 0,
    totalResponses: 0,
    totalUsers: 0,
    published: 0,
    draft: 0,
  };

  for (const survey of surveys) {
    if (!isWithinRange(survey.createdAt, range)) continue;

    stats.totalSurveys += 1;

    const status = survey.status.toLowerCase();
    if (status === "published") stats.published += 1;
    else if (status === "draft") stats.draft += 1;
  }

  for (const response of responses) {
    if (isWithinRange(response.submittedAt, range)) stats.totalResponses += 1;
  }

  for (const user of users) {
    if (isWithinRange(user.createdAt, range)) stats.totalUsers += 1;
  }

  return stats;
}
