import React from "react";
import { cn } from "@/lib/cn";
import Button, { type ButtonVariant } from "../atoms/Button";
interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface ButtonGroupProps {
  button1: ButtonProps;
  button2: ButtonProps;
  gap?: number;
  className?: string;
}

export default function ButtonGroup({
  button1,
  button2,
  gap = 4,
  className = "",
}: ButtonGroupProps) {
  const gapClasses: Record<number, string> = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };
  return (
    <div className={cn("flex items-center", gapClasses[gap] || "gap-4", className)}>
      <Button variant={button1.variant} size={button1.size || "md"} className={button1.className}>
        {button1.children}
      </Button>
      <Button variant={button2.variant} size={button2.size || "md"} className={button2.className}>
        {button2.children}
      </Button>
    </div>
  );
}
