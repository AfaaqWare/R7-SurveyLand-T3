import type { Survey } from "../types/survey";

export function getSurveyTitleBySurveyId(surveys: Survey[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const survey of surveys) {
    map.set(survey.id, survey.title);
  }

  return map;
}
