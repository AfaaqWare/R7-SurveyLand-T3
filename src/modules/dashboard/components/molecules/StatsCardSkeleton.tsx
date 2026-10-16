import { cn } from "@/lib/cn";
import Skeleton from "@/shared/components/atoms/Skeleton";

interface StatsCardSkeletonProps {
  className?: string;
}

export default function StatsCardSkeleton({ className }: StatsCardSkeletonProps) {
  return (
    <article className={cn("ds-bg-card ds-rounded-sm ds-p-lg", "flex w-full flex-col", className)}>
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-9 shrink-0 rounded-sm" />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <Skeleton className="mt-3 h-3 w-24 self-center" />
    </article>
  );
}
