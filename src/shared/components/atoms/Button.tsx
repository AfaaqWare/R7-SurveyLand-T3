import React from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline1"
  | "ghost"
  | "primary200"
  | "disabled"
  | "white"
  | "primaryWhite"
  | "panel";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "xlg" | "form";
  className?: string;
  children: React.ReactNode;
  isFullWidth?: boolean;
  isRounded?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
  isFullWidth = false,
  isRounded = false,
  id,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-[var(--motion-fast)] ease-out focus:outline-none focus:shadow-[0_0_0_var(--focus-ring-width)_var(--focus-ring-color)]";

  const sizes = {
    sm: "px-[var(--space-md)] py-[var(--space-xs)] ds-text-sm",
    md: "px-[var(--space-xl)] py-[var(--space-sm)] ds-text-base",
    lg: "px-[var(--space-3xl)] py-[var(--space-md)] ds-text-md",
    xlg: "px-[111px] py-[11px]",
    form: "h-[40px] md:w-[395px] ds-text-base",
  };

  const variants = {
    primary: "ds-bg-primary ds-text-white hover:opacity-90 active:opacity-80 ds-shadow-sm",
    secondary: "ds-bg-secondary ds-text-white hover:opacity-90 active:opacity-80 ds-shadow-sm",
    outline:
      "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:ds-bg-primary hover:ds-text-white active:opacity-80",
    outline1:
      "bg-transparent border border-[var(--color-primary)] ds-text-primary hover:ds-bg-primary hover:ds-text-white active:opacity-80",
    ghost: "bg-transparent ds-text-primary font-semibold hover:opacity-70 active:opacity-50",
    primary200: "ds-primary-200 ds-text-alt hover:opacity-90 active:opacity-80",
    disabled: "ds-bg-primary ds-text-white cursor-not-allowed ds-disabled",
    white: "ds-primary-300 ds-text-alt hover:opacity-90 active:opacity-80 ds-shadow-sm",
    primaryWhite: "ds-bg-primary text-white hover:opacity-90 active:opacity-80 ds-shadow-sm",
    panel: "ds-bg sm:px-15 ds-text-alt font-semibold hover:opacity-90",
  };

  const resolvedFullWidth = isFullWidth;
  const isDisabled = disabled || variant === "disabled";
  const radius = isRounded ? "rounded-full" : "ds-rounded-md";

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cn(
        base,
        radius,
        sizes[size],
        variants[variant],
        resolvedFullWidth ? "w-full" : "",
        isDisabled && variant !== "disabled" ? "ds-disabled" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
