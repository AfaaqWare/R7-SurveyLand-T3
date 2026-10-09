import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/shared/components/atoms/Button";
import { Eye, Send, Pencil } from "@/assets/icons/icons";

function SurveyHeaderActions() {
  const t = useTranslations("dashboard.mySurveys");
  const params = useParams();
  const surveyId = typeof params?.id === "string" ? params.id : "";

  return (
    <div className="flex flex-wrap gap-[14px]">
      <Link href={`/dashboard/my-surveys/${surveyId}/preview`}>
        <Button size="sm" variant="outline" className="border-1 border-[#E7E8ED]">
          <Eye size={13} className="shrink-0 text-[#636978]" />
          <span className="text-[10px] text-[#636978]">{t("actions.preview")} </span>
        </Button>
      </Link>

      <Link href={`/dashboard/my-surveys/${surveyId}/edit`}>
        <Button size="sm" variant="outline" className="border-1 border-[#E7E8ED]">
          <Pencil size={13} className="shrink-0 text-[#636978]" />
          <span className="text-[10px] text-[#636978]">{t("actions.edit")} </span>
        </Button>
      </Link>

      <Link href={`/dashboard/my-surveys/${surveyId}/add-question`}>
        <Button size="sm">
          <Send size={13} className="shrink-0 text-[10px]" />
          <span className="text-[10px]">{t("actions.openBuilder")} </span>
        </Button>
      </Link>
    </div>
  );
}

export default SurveyHeaderActions;
