"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import Icon from "@/shared/components/atoms/Icon";
import { MoreVertical } from "@/assets/icons/icons";
import { surveyCardMenuItems } from "../../utils/data";

interface SurveyCardMenuProps {
  surveyId: string;
  onPublish: () => void;
  onCopyLink: () => void;
  onDelete: () => void;
  isPublishing?: boolean;
  isDeleting?: boolean;
  className?: string;
}

export default function SurveyCardMenu({
  surveyId,
  onPublish,
  onCopyLink,
  onDelete,
  isPublishing = false,
  isDeleting = false,
  className,
}: SurveyCardMenuProps) {
  const t = useTranslations("dashboard.surveys.card.menu");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const actionHandlers: Record<string, { run: () => void; disabled: boolean }> = {
    publish: { run: onPublish, disabled: isPublishing },
    copyLink: { run: onCopyLink, disabled: isPublishing },
    delete: { run: onDelete, disabled: isDeleting },
  };

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("label")}
        className="ds-shadow-sm flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 transition-colors hover:bg-white"
      >
        <Icon IconComponent={MoreVertical} size="xs" color="currentColor" />
      </button>

      {isOpen && (
        <ul
          role="menu"
          aria-label={t("label")}
          className="ds-border-card ds-shadow-md absolute end-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border bg-[var(--color-bg-card)]/80 py-1 backdrop-blur-md"
        >
          {surveyCardMenuItems.map(item => {
            const itemClassName = cn(
              "flex w-full items-center gap-2.5 px-4 py-2.5 text-start ds-text-sm transition-colors",
              item.danger
                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                : "ds-text-secondary hover:ds-primary-200"
            );

            if (item.kind === "link") {
              return (
                <li key={item.id} role="none">
                  <Link
                    href={item.href?.(surveyId) || ""}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className={itemClassName}
                  >
                    <Icon IconComponent={item.icon} size="xs" variant="secondary" />
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            }

            const handler = actionHandlers[item.id];

            return (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={handler.disabled}
                  onClick={() => {
                    setIsOpen(false);
                    handler.run();
                  }}
                  className={cn(
                    itemClassName,
                    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <Icon
                    IconComponent={item.icon}
                    size="xs"
                    color={item.danger ? "currentColor" : undefined}
                    variant={item.danger ? undefined : "secondary"}
                  />
                  {t(item.labelKey)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
