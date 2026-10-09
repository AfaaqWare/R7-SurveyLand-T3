import { cn } from "@/lib/cn";
import Skeleton from "@/shared/components/atoms/Skeleton";

interface QuickActionCardSkeletonProps {
  className?: string;
}

export default function QuickActionCardSkeleton({ className }: QuickActionCardSkeletonProps) {
  return (
    <div
      className={cn(
        "ds-bg-form animate-pulse",
        "flex min-h-[116px] w-full flex-row items-center gap-5",
        "ds-rounded-2xl p-5",
        className
      )}
      role="status"
      aria-hidden="true"
    >
      <Skeleton variant="card" className="size-11 shrink-0 rounded-md" />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton variant="card" className="h-4 w-24" />
        <Skeleton variant="card" className="h-3 w-32" />
      </div>
    </div>
  );
}
