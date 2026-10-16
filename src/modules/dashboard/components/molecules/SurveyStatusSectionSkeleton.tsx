import { cn } from "@/lib/cn";
import Skeleton from "@/shared/components/atoms/Skeleton";

const LEGEND_COUNT = 3;

interface SurveyStatusSectionSkeletonProps {
  className?: string;
}

export default function SurveyStatusSectionSkeleton({ className }: SurveyStatusSectionSkeletonProps) {
  return (
    <section className={cn("ds-bg-card ds-rounded-2xl p-7", "w-full", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>

      <div
        className={cn(
          "mt-13 flex w-full items-center justify-center",
          "flex-col gap-6",
          "sm:flex-row"
        )}
      >
        <div className="relative flex w-full justify-center lg:w-1/2">
          <Skeleton className="h-[160px] w-[160px] rounded-full" />
        </div>

        <div className="flex w-full max-w-[250px] flex-col gap-5 lg:w-1/2">
          {Array.from({ length: LEGEND_COUNT }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[.5rem_minmax(50px,1fr)_30px_50px] items-center gap-1"
            >
              <Skeleton className="size-2 rounded-full" />
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-6" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
