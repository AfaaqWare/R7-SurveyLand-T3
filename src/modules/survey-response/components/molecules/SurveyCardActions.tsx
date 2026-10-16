"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/atoms/Button";
import Icon from "@/shared/components/atoms/Icon";
import { cn } from "@/lib/cn";
import { surveyCardActions } from "../../utils/data";

interface SurveyCardActionsProps {
  surveyId: string;
}

export default function SurveyCardActions({ surveyId }: SurveyCardActionsProps) {
  const t = useTranslations("dashboard.surveys.card");

  return (
    <div className="mt-2 flex w-full flex-wrap items-center gap-3">
      {surveyCardActions.map(action => {
        const isPrimary = action.variant === "primary";

        const iconProps = isPrimary ? { color: "#ffffff" } : { variant: "secondary" as const };

        const buttonClassName = cn(
          "px-0 w-full",
          action.muted && "!border-[var(--border-color)] !text-[var(--color-text-dash)]",
          isPrimary && "!text-white"
        );

        const buttonContent = (
          <>
            <Icon
              IconComponent={action.icon}
              size="xs"
              {...iconProps}
              className="shrink-0 !text-inherit"
            />
            <span className="whitespace-nowrap">{t(action.labelKey)}</span>
          </>
        );

        const itemWrapperClassName = "flex-1 basis-[80px]";

        const href = action.href?.(surveyId) || "";

        return (
          <Link key={action.id} href={href} className={itemWrapperClassName}>
            <Button variant={action.variant} size="sm" className={buttonClassName}>
              {buttonContent}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
