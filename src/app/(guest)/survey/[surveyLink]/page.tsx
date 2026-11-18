"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SurveyDetailsCard from "@/modules/survey-response/components/orgamisms/SurveyDetailsCard";
import SurveyQuestionsForm from "@/modules/survey-response/components/orgamisms/SurveyQuestionsForm";
import SurveyInformationForm from "@/modules/survey-response/components/orgamisms/SurveyInformationForm";
import PublicLayout from "@/shared/components/Layout/PublicLayout";
import { useGetQuestionsByLink } from "@/modules/responses/hooks/useGetQuestionsByLink";
import { useSubmitPublicSurveyResponse } from "@/modules/responses/hooks/useSubmitSurveyResponse";
import { SurveyAnswers } from "@/modules/responses/type/responses";
import { ErrorState, LoadingState } from "@/core/ui-states";
import { useTranslations } from "next-intl";
import { formatDateTime } from "@/shared/utils/formatDateTime";
import { isEmail } from "@/shared/utils/validators";
import { useAlert } from "@/shared/hooks/useAlert";

export default function SurveyResponseTemplate() {
  const t = useTranslations("surveyResponse");
  const { showAlert } = useAlert();

  const params = useParams();
  const surveyLink = params.surveyLink as string;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  const { data, isLoading, error } = useGetQuestionsByLink(surveyLink);

  const { mutate: submitResponse, isPending } = useSubmitPublicSurveyResponse(surveyLink);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isPending) {
      return;
    }
    submitResponse(
      {
        respondentName: fullName.trim(),
        respondentEmail: email.trim(),
        answers,
      },
      {
        onSuccess: () => {
          showAlert("success", t("submitSuccess"));
          setFullName("");
          setEmail("");
          setAnswers({});
        },
        onError: () => {
          showAlert("error", t("submitError"));
        },
      }
    );
  };
  const { date, time } = formatDateTime(data?.deadline || "");

  const isValidName = fullName.trim().length >= 3;

  const isValidEmail = isEmail(email);

  const areRequiredQuestionsAnswered = data?.questions
    .filter(question => question.isRequired)
    .every(question => {
      const answer = answers[question.qid];

      if (Array.isArray(answer)) {
        return answer.length > 0;
      }

      return typeof answer === "string" && answer.trim().length > 0;
    });

  const isFormValid = isValidName && isValidEmail && areRequiredQuestionsAnswered;

  if (isLoading) {
    return (
      <PublicLayout>
        <LoadingState />
      </PublicLayout>
    );
  }

  if (error || !data) {
    return (
      <PublicLayout>
        <ErrorState />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="ds-bg min-h-screen pt-10 sm:pt-14 lg:pt-16">
        <div className="ds-container mx-auto max-w-[1232px]">
          <SurveyDetailsCard
            title={data.title}
            description={data.description}
            deadline={`${date} ${time}`}
            duration={t("responseDuration")}
            image={data.cover}
          />

          <form onSubmit={handleSubmit} className="mt-10 space-y-12">
            <SurveyInformationForm
              fullName={fullName}
              email={email}
              onFullNameChange={setFullName}
              onEmailChange={setEmail}
            />

            <SurveyQuestionsForm
              questions={data.questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              isSubmitDisabled={!isFormValid || isPending}
            />
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
