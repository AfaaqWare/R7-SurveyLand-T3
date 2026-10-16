import type { SurveyResponse } from "../type/responses";

export function getResponsesCountBySurveyId(responses: SurveyResponse[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const response of responses) {
    map.set(response.surveyId, (map.get(response.surveyId) ?? 0) + 1);
  }

  return map;
}
