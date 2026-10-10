"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Title from "@/shared/components/atoms/Title";
import Text from "@/shared/components/atoms/Text";
import Button from "@/shared/components/atoms/Button";
import Icon from "@/shared/components/atoms/Icon";

import { Pencil, Send, Copy, Check, X } from "@/assets/icons/icons";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  XShareButton,
  XIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import usePublishSurveyLink from "../../hooks/usePublishSurveyLink";
import type { Survey } from "../../types/survey";
import { useAlert } from "@/shared/hooks/useAlert";

interface ExportResponsesHeaderProps {
  survey: Survey;
}

export default function ExportResponsesHeader({ survey }: ExportResponsesHeaderProps) {
  const t = useTranslations("dashboard.surveysExport");
  const tMenu = useTranslations("dashboard.surveys.card.menu");

  const publishMutation = usePublishSurveyLink();

  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { showAlert } = useAlert();

  const handleShare = async () => {
    if (survey.status === "closed") {
      return;
    }
    let link = survey.link;

    if (!link) {
      try {
        const updated = await publishMutation.mutateAsync(survey.id);
        link = updated.link;
      } catch {
        showAlert("error", tMenu("errorTitle"), tMenu("copyLinkErrorText"));
        return;
      }
    }

    if (!link) {
      showAlert("error", tMenu("errorTitle"), tMenu("copyLinkErrorText"));
      return;
    }
    const surveyUrl = `${window.location.origin}/survey/${link}`;

    setShareLink(surveyUrl);
    setIsShareOpen(true);
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
        showAlert("success", tMenu("copyLinkSuccessTitle"), shareLink);
      }, 2000);
    } catch {
      showAlert("error", tMenu("errorTitle"), tMenu("copyLinkErrorText"));
    }
  };
  const isClosed = survey.status === "closed";

  return (
    <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <Title size="md">{t("title")}</Title>

        <Text variant="secondary" size="sm" className="mt-1">
          {t("subtitle")}
        </Text>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/dashboard/my-surveys/${survey.id}/edit`}>
          <Button
            variant="outline"
            size="md"
            className="!border-[var(--border-color)] !px-10 !text-[var(--color-text-secondary)]"
          >
            <Icon IconComponent={Pencil} size="xs" variant="secondary" />

            {t("edit")}
          </Button>
        </Link>

        <div className="relative">
          <Button
            variant="primaryWhite"
            size="md"
            onClick={() => void handleShare()}
            disabled={publishMutation.isPending || isClosed}
          >
            <Icon IconComponent={Send} size="xs" color="#ffffff" />

            {t("shareSurvey")}
          </Button>

          {isShareOpen && shareLink && (
            <div className="ds-bg-card fixed [inset-inline-end:0] top-[120px] z-50 mx-auto mt-2 w-screen rounded-xl border border-[var(--border-color)] p-4 shadow-lg sm:absolute sm:top-full sm:w-[300px] sm:max-w-[360px]">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Text size="sm" className="font-semibold text-[var(--color-text-primary)]">
                    Share survey
                  </Text>

                  <Text size="xs" variant="secondary" className="mt-1">
                    Share this survey with others
                  </Text>
                </div>

                <button
                  type="button"
                  onClick={() => setIsShareOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg-secondary)]"
                  aria-label="Close share menu"
                >
                  <Icon IconComponent={X} size="xs" />
                </button>
              </div>

              {/* Share buttons */}
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                <WhatsappShareButton url={shareLink} aria-label="Share on WhatsApp">
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <FacebookShareButton url={shareLink} aria-label="Share on Facebook">
                  <FacebookIcon size={40} round />
                </FacebookShareButton>

                <TelegramShareButton url={shareLink} aria-label="Share on Telegram">
                  <TelegramIcon size={40} round />
                </TelegramShareButton>

                <LinkedinShareButton url={shareLink} aria-label="Share on LinkedIn">
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>

                <XShareButton url={shareLink} aria-label="Share on X">
                  <XIcon size={40} round />
                </XShareButton>

                <EmailShareButton url={shareLink} aria-label="Share by email">
                  <EmailIcon size={40} round />
                </EmailShareButton>
              </div>

              {/* Copy link */}
              <div className="mt-4 border-t border-[var(--border-color)] pt-4">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--color-bg-secondary)] p-2">
                  <Text
                    size="xs"
                    className="min-w-0 flex-1 truncate text-[var(--color-text-secondary)]"
                  >
                    {shareLink}
                  </Text>

                  <button
                    type="button"
                    onClick={() => void handleCopyLink()}
                    className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-card)]"
                  >
                    <Icon IconComponent={isCopied ? Check : Copy} size="xs" variant="secondary" />

                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
