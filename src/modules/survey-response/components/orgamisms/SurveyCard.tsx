"use client";

import { useTranslations, useLocale } from "next-intl";
import Swal from "sweetalert2";
import { cn } from "@/lib/cn";
import SeperatorLink from "@/shared/components/atoms/SeperatorLink";
import SurveyCardCover from "../molecules/SurveyCardCover";
import SurveyCardInfo from "../molecules/SurveyCardInfo";
import SurveyCardMeta from "../molecules/SurveyCardMeta";
import SurveyCardActions from "../molecules/SurveyCardActions";
import usePublishSurveyLink from "../../hooks/usePublishSurveyLink";
import useDeleteSurvey from "../../hooks/useDeleteSurvey";
import type { Survey } from "../../types/survey";
import { useAlert } from "@/shared/hooks/useAlert";

interface SurveyCardProps {
  survey: Survey;
}

export default function SurveyCard({ survey }: SurveyCardProps) {
  const t = useTranslations("dashboard.surveys.card.menu");
  const locale = useLocale();
  const publishMutation = usePublishSurveyLink();
  const deleteMutation = useDeleteSurvey();
  const { showAlert } = useAlert();

  const handlePublish = () => {
    publishMutation.mutate(survey.id, {
      onSuccess: updated => showAlert("success", t("publishSuccessTitle"), updated.link ?? ""),
      onError: () => showAlert("error", t("errorTitle"), t("publishErrorText")),
    });
  };

  const handleCopyLink = async () => {
    let link = survey.link;

    if (!link) {
      try {
        const updated = await publishMutation.mutateAsync(survey.id);
        link = updated.link;
      } catch {
        showAlert("error", t("errorTitle"), t("copyLinkErrorText"));
        return;
      }
    }

    if (!link) {
      showAlert("error", t("errorTitle"), t("copyLinkErrorText"));
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      showAlert("success", t("copyLinkSuccessTitle"), link);
    } catch {
      showAlert("error", t("errorTitle"), t("copyLinkErrorText"));
    }
  };

  const handleDelete = () => {
    void Swal.fire({
      title: t("deleteConfirmTitle"),
      text: t("deleteConfirmText", { title: survey.title }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete"),
      cancelButtonText: t("cancel"),
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-text-secondary)",
      reverseButtons: locale === "ar",
    }).then(result => {
      if (!result.isConfirmed) return;

      deleteMutation.mutate(survey.id, {
        onSuccess: () => showAlert("success", t("deleteSuccessTitle")),
        onError: () => showAlert("error", t("errorTitle"), t("deleteErrorText")),
      });
    });
  };

  return (
    <article className="group relative h-full cursor-pointer">
      <div
        className={cn(
          "ds-bg-card ds-border-card ds-rounded-2xl relative flex h-full flex-col overflow-hidden",
          "transition-[transform,box-shadow] duration-200",
          "group-hover:-translate-y-1 group-hover:shadow-xl",
          "dark:group-hover:shadow-[0_8px_10px_-10px_var(--color-stats-teal)]"
        )}
      >
        <SurveyCardCover
          cover={survey.cover}
          title={survey.title}
          surveyId={survey.id}
          onPublish={handlePublish}
          onCopyLink={() => void handleCopyLink()}
          onDelete={handleDelete}
          isPublishing={publishMutation.isPending}
          isDeleting={deleteMutation.isPending}
        />

        <div className="flex flex-1 flex-col p-4">
          <SurveyCardInfo survey={survey} />

          <SeperatorLink className="my-4 !bg-[var(--border-color-alt)]" />

          <SurveyCardMeta survey={survey} />

          <SurveyCardActions surveyId={survey.id} />
        </div>
      </div>
    </article>
  );
}
