"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useDeleteSurveyAction from "../../hooks/useDeleteSurveyAction";
import Title from "@/shared/components/atoms/Title";
import Button from "@/shared/components/atoms/Button";
import { Pencil, Trash2, Link as LinkIcon, Download } from "@/assets/icons/icons";

interface SurveyActionProps {
  handlePublishLink?: React.MouseEventHandler<HTMLButtonElement>;
}

function SurveyAction({ handlePublishLink }: SurveyActionProps) {
  const t = useTranslations("dashboard.mySurveys");
  const params = useParams();
  const router = useRouter();
  const surveyId = typeof params?.id === "string" ? params.id : "";
  const { confirmDelete } = useDeleteSurveyAction();

  const handleDelete = () => {
    confirmDelete(surveyId, () => router.push("/dashboard/my-surveys"));
  };

  return (
    <div className="ds-bg-card min-w-0 rounded-[15px] p-[18px] sm:p-[29px]">
      <Title size="md" className="mb-5">
        {t("quickActions.title")}
      </Title>

      <div className="flex flex-col gap-3">
        <Link href={`/dashboard/my-surveys/${surveyId}/edit`}>
          <Button
            size="md"
            variant="outline"
            className="w-full justify-start border-1 border-[#E7E8ED]"
          >
            <Pencil size={13} className="shrink-0" />
            <span className="text-[10px]">{t("actions.edit")}</span>
          </Button>
        </Link>

        <Button
          size="md"
          variant="outline"
          onClick={handlePublishLink}
          className="w-full justify-start border-1 border-[#E7E8ED]"
        >
          <LinkIcon size={13} className="shrink-0" />
          <span className="text-[10px]"> {t("actions.PublishLink")} </span>
        </Button>

        <Link href={`/dashboard/my-surveys/${surveyId}/export`}>
          <Button
            size="md"
            variant="outline"
            className="w-full justify-start border-1 border-[#E7E8ED]"
          >
            <Download size={13} className="shrink-0" />
            <span className="text-[10px]"> {t("actions.export")} </span>
          </Button>
        </Link>

        <Button
          size="md"
          variant="outline"
          onClick={handleDelete}
          className="w-full justify-start border-1 border-[#E7E8ED]"
        >
          <Trash2 className="shrink-0 text-red-500" size={13} />
          <span className="text-[10px] text-red-500">{t("actions.delete")}</span>
        </Button>
      </div>
    </div>
  );
}

export default SurveyAction;
