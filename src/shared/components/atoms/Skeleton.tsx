import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  variant?: "form" | "card";
}

const variantBackground = {
  form: "ds-bg-form",
  card: "ds-bg-card",
};

export default function Skeleton({ className, variant = "form" }: SkeletonProps) {
  return (
    <div
      className={cn(variantBackground[variant], "animate-pulse rounded", className)}
      role="status"
      aria-hidden="true"
    />
  );
}
