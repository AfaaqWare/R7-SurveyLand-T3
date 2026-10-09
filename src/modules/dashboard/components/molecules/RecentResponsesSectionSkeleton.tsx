import { cn } from "@/lib/cn";
import Skeleton from "@/shared/components/atoms/Skeleton";

const ROWS_COUNT = 4;

export default function RecentResponsesSectionSkeleton() {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <div className="flex flex-col gap-4 pt-4">
          {Array.from({ length: ROWS_COUNT }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {Array.from({ length: ROWS_COUNT }).map((_, index) => (
          <div key={index} className={cn("ds-border-card ds-rounded-md", "border p-4")}>
            <Skeleton className="mb-4 h-4 w-28" />

            <div className="flex items-center justify-between py-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>

            <div className="flex items-start justify-between gap-4 py-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-20" />
            </div>

            <div className="flex items-center justify-between py-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
