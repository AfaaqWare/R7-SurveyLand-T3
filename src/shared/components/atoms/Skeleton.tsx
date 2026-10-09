import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("ds-bg-form animate-pulse rounded", className)}
      role="status"
      aria-hidden="true"
    />
  );
}
