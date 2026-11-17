"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { Check, ChevronDown } from "@/assets/icons/icons";

export type SurveysSortOrder = "newest" | "oldest";

interface SurveySortSelectProps {
  value: SurveysSortOrder;
  onChange: (value: SurveysSortOrder) => void;
  className?: string;
}

const SORT_OPTIONS: SurveysSortOrder[] = ["newest", "oldest"];

export default function SurveySortSelect({ value, onChange, className }: SurveySortSelectProps) {
  const t = useTranslations("dashboard.surveys.filters.sort");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (option: SurveysSortOrder) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative inline-flex w-fit", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-controls={isOpen ? listId : undefined}
        aria-expanded={isOpen}
        aria-label={t("label")}
        className="ds-text-sm ds-bg-card ds-border-card ds-rounded-lg focus:ds-focus hover:ds-primary-200 flex h-11 cursor-pointer items-center gap-2 ps-4 pe-3 !font-medium !text-[var(--color-text-secondary)] transition-colors !outline-none"
      >
        <span>{t(value)}</span>
        <ChevronDown
          size={16}
          className={cn(
            "ds-text-secondary shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          aria-label={t("label")}
          className="ds-bg-card ds-border-card ds-shadow-md absolute end-0 top-full z-20 mt-2 w-full min-w-40 overflow-hidden rounded-lg border py-1"
        >
          {SORT_OPTIONS.map(option => (
            <li key={option}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                aria-current={option === value ? "true" : undefined}
                className={cn(
                  "ds-text-sm hover:ds-primary-200 flex w-full items-center justify-between gap-2 px-4 py-2.5 text-start transition-colors",
                  option === value ? "ds-text-primary !font-semibold" : "ds-text-secondary"
                )}
              >
                {t(option)}
                {option === value && <Check size={16} className="ds-text-primary shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
